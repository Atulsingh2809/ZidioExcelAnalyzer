const FileUpload = require('../models/FileUpload');
const XLSX = require('xlsx');
const path = require('path');

// Upload and parse Excel file
const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Parse Excel file
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    const headers = Object.keys(jsonData[0] || {});

    // Store in DB
    const fileDoc = new FileUpload({
      userId: req.user._id,
      filename: req.file.filename,
      parsedData: jsonData,
      headers,
    });
    await fileDoc.save();

    res.status(201).json({
      message: 'File uploaded and parsed successfully',
      fileId: fileDoc._id,
      headers,
      dataSample: jsonData.slice(0, 10), // send first 10 rows as sample
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};

// Get all uploads for current user
const getUserUploads = async (req, res) => {
  try {
    const uploads = await FileUpload.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ uploads });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploads' });
  }
};

// Get a single upload by ID (must belong to user or be admin)
const getUploadById = async (req, res) => {
  try {
    const upload = await FileUpload.findById(req.params.id);
    if (!upload) return res.status(404).json({ message: 'Upload not found' });
    if (upload.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ upload });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upload' });
  }
};

// Get dashboard data for current user
const getDashboardData = async (req, res) => {
  try {
    const uploads = await FileUpload.find({ userId: req.user._id }).sort({ createdAt: -1 });

    // Compute stats
    const totalUploads = uploads.length;
    const totalRows = uploads.reduce((sum, u) => sum + (u.parsedData ? u.parsedData.length : 0), 0);
    // For chartCount, insights, quality, category, add defaults if missing
    const totalCharts = uploads.reduce((sum, u) => sum + (u.chartConfigs ? u.chartConfigs.length : 0), 0);
    // For now, mock insights and quality (since not in schema)
    const totalInsights = uploads.reduce((sum, u) => sum + (u.insights || 0), 0);
    const recentUploads = uploads.filter(u => new Date(u.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const qualities = uploads.map(u => u.quality).filter(q => typeof q === 'number' && q > 0);
    const avgQuality = qualities.length ? Math.round(qualities.reduce((sum, q) => sum + q, 0) / qualities.length) : 0;
    const categoryStats = {};
    uploads.forEach(u => {
      const cat = u.category || 'Uncategorized';
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    res.json({
      uploads,
      stats: { totalUploads, totalRows, totalCharts, totalInsights, recentUploads, avgQuality },
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

module.exports = { uploadExcel, getUserUploads, getUploadById, getDashboardData }; 
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadExcel, getUserUploads, getUploadById, getDashboardData } = require('../controllers/fileController');

// GET /api/user/dashboard (protected route)
router.get('/dashboard', authMiddleware, getDashboardData);

// GET /api/user/admin-dashboard (admin only)
router.get('/admin-dashboard', authMiddleware, roleMiddleware, (req, res) => {
  res.json({
    message: 'Admin dashboard accessed successfully',
    user: req.user
  });
});

// POST /api/user/upload (protected, Excel upload)
router.post('/upload', authMiddleware, upload.single('file'), uploadExcel);

// GET /api/user/uploads (protected, list uploads)
router.get('/uploads', authMiddleware, getUserUploads);
// GET /api/user/upload/:id (protected, get single upload)
router.get('/upload/:id', authMiddleware, getUploadById);

module.exports = router;

const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  parsedData: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  chartConfigs: {
    type: Array,
    default: [],
  },
  summaryText: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('FileUpload', fileUploadSchema); 
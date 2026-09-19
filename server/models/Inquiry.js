const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  organization: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceRequired: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String },
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

const InquiryModel = mongoose.model('Inquiry', inquirySchema);

// Fallback file storage
const jsonFilePath = path.join(__dirname, '../data/inquiries.json');

const getLocalInquiries = () => {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      fs.writeFileSync(jsonFilePath, JSON.stringify([]));
      return [];
    }
    return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalInquiry = (data) => {
  const list = getLocalInquiries();
  const newItem = {
    _id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...data,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  list.unshift(newItem);
  fs.writeFileSync(jsonFilePath, JSON.stringify(list, null, 2));
  return newItem;
};

module.exports = {
  InquiryModel,
  getLocalInquiries,
  saveLocalInquiry
};

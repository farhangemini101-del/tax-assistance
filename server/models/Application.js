const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  positionId: { type: String },
  positionTitle: { type: String, required: true },
  coverLetter: { type: String },
  resumeUrl: { type: String, required: true },
  status: { type: String, default: 'Submitted' },
  appliedAt: { type: Date, default: Date.now }
});

const ApplicationModel = mongoose.model('Application', applicationSchema);

const jsonFilePath = path.join(__dirname, '../data/applications.json');

const getLocalApplications = () => {
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

const saveLocalApplication = (data) => {
  const list = getLocalApplications();
  const newItem = {
    _id: 'app_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...data,
    status: 'Submitted',
    appliedAt: new Date().toISOString()
  };
  list.unshift(newItem);
  fs.writeFileSync(jsonFilePath, JSON.stringify(list, null, 2));
  return newItem;
};

module.exports = {
  ApplicationModel,
  getLocalApplications,
  saveLocalApplication
};

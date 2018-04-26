const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  linkedIn: {
    companyId: String,
    name: String,
  },
});

module.exports = mongoose.model('Company', CompanySchema);

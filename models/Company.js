'use strict';

const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  linkedIn: {
    companyId: String,
  },
});

module.exports = mongoose.model('Company', CompanySchema);

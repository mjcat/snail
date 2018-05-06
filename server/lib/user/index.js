'use strict';

const _ = require('lodash');
const debug = require('debug')('snailed:lib:user');
const mongoose = require('mongoose');

const Company = require('../../../models/Company');
const User = require('../../../models/User');

const userLib = {};

/************** Main ******************/

userLib.getData = async userId => {
  if (!userId) {
    throw new Error('No user id');
  }

  const user = await User.findById(userId).populate('linkedIn.company').populate('linkedIn.blacklistedCompanies');
  if (!user) {
    throw new Error('No user found');
  }

  const blacklistedCompanies = _.get(user, 'linkedIn.blacklistedCompanies', []).map(c => {
    return c.name;
  });

  const userData = {
    name: {
      first: _.get(user, 'name.first'),
      last: _.get(user, 'name.last'),
    },
    nickname: user.nickname,
    linkedIn: {
      company: _.get(user, 'linkedIn.company.name'),
      role: _.get(user, 'linkedIn.role'),
      roleType: _.get(user, 'linkedIn.roleType'),
      blacklistedCompanies
    },
  };

  return userData;
};

userLib.update = async (userId, userData) => {
  if (!userId) {
    throw new Error('No user id');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('No user found');
  }
  // TODO validation, here and/or in schema
  if (userData.email) {
    user.email = userData.email;
  }
  if (userData.firstName) {
    user.name.first = userData.firstName;
  }
  if (userData.lastName) {
    user.name.last = userData.lastName;
  }
  if (userData.nickname) {
    user.nickname = userData.nickname;
  }

  if (userData.role) {
    user.linkedIn.role = userData.role;
  }
  if (userData.roleType) {
    user.linkedIn.roleType = userData.roleType;
  }
  if (userData.location) {
    user.linkedIn.location = userData.location;
  }

  if (userData.companyName) {
    const companyId = await userLib.getOrCreateCompany(userData.companyName);
    
    user.linkedIn.company = companyId;
  }
  if (Array.isArray(userData.blacklistedCompanies)) {
    user.linkedIn.blacklistedCompanies = [];
    
    for (let companyName of userData.blacklistedCompanies) {
      const companyId = await userLib.getOrCreateCompany(companyName);

      const isCompanyBlacklisted = user.linkedIn.blacklistedCompanies.some(c => c.equals(companyId));
      if (!isCompanyBlacklisted) {
        user.linkedIn.blacklistedCompanies.push(companyId);
      }
    }
  }

  await user.save();

  return true;
}

userLib.getCompanySuggestions = async input => {
  const defaultSuggestions = ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'];

  if (!input) {
    return defaultSuggestions;
  } else {
    const regexp = new RegExp('^' + input, 'i');
    const companies = await Company.find({ name: regexp });

    if (!companies || !companies.length) {
      return defaultSuggestions;
    }

    return companies.map((c) => c.name);
  }
};

/************** Helpers ******************/

userLib.getOrCreateCompany = async companyName => {
  if (!companyName) {
    return;
  }

  const regexp = new RegExp(companyName, 'i');
  let company = await Company.findOne({ name: regexp });
  if (!company) {
    company = new Company({
      name: _.startCase(companyName),
    });

    await company.save();
  }

  return company._id;
};

module.exports = userLib;

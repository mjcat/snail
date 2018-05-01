const _ = require('lodash');
const debug = require('debug')('snailed:lib:user');
const mongoose = require('mongoose');

const User = require('../../../models/User');

const user = {};

user.getData = async userId => {
  if (!userId) {
    throw new Error('No user id');
  }

  const user = await User.findById(userId).populate('linkedIn.company').populate('linkedIn.blacklistedCompanies');
  if (!user) {
    throw new Error('No user found');
  }

  const blacklistedCompanies = _.get(user, 'linkedIn.blacklistedCompanies', []).map(c => {
    return { id: c._id, name: _.get(c, 'linkedIn.name') };
  });

  const userData = {
    name: {
      first: _.get(user, 'name.first'),
      last: _.get(user, 'name.last'),
    },
    nickname: user.nickname,
    linkedIn: {
      company: {
        id: _.get(user, 'linkedIn.company._id'),
        name: _.get(user, 'linkedIn.company.linkedIn.name'),
      },
      role: _.get(user, 'linkedIn.role'),
      roleType: _.get(user, 'linkedIn.roleType'),
      blacklistedCompanies
    },
  };

  return userData;
};

module.exports = user;

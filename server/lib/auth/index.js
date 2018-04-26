const _ = require('lodash');
const axios = require('axios');
const debug = require('debug')('snailed:lib:auth');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');
const querystring = require('querystring');

const Company = require('../../../models/Company');
const User = require('../../../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const auth = {};

const generateToken = user => {
  const payload = {
    user,
    iss: 'autofi.com',
    sub: 'general',
    version: 'v1',
  };

  const THREE_MONTHS = (60 * 60 * 24) * 30 * 3;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: THREE_MONTHS });
};

/**
 * userData: {
    emailAddress: 'yueyang.guan@gmail.com',
    firstName: 'Vicki',
    id: 'QN89bvi1HJ',
    lastName: 'Guan',
    positions: {
      _total: 1, values: [{
        company: { name: 'AutoFi' },
        id: 1261683673,
        isCurrent: true,
        location: { country: [Object], name: 'San Francisco Bay Area' },
        startDate: { month: 3, year: 2018 },
        title: 'Engineering Manager',
      }]
    },
    publicProfileUrl: 'https://www.linkedin.com/in/vicki-guan-b8995427',
  }
 */
const createOrUpdate = async (userData, { accessToken, expiresIn }) => {
  debug('create or update user');

  const linkedInId = userData.id;
  let user = await User.findOne({ 'linkedIn.userId': linkedInId });
  user = user || new User({ email: userData.emailAddress });
  debug(`user: ${user}`);

  user.email = userData.emailAddress;
  user.name = {
    first: userData.firstName,
    last: userData.lastName,
  };
  user.linkedIn.userId = linkedInId;
  user.linkedIn.profileUrl = userData.publicProfileUrl;
  user.linkedIn.accessToken = accessToken;
  user.linkedIn.expiresTs = moment().add(expiresIn, 'seconds');

  let companyId, companyName;
  if (userData.positions.values && userData.positions.values.length) {
    const currentPosition = userData.positions.values.find(p => p.isCurrent);
    user.linkedIn.role = currentPosition.title;
    user.linkedIn.location = currentPosition.location.name;

    companyName = currentPosition.company.name;
    if (companyName) {
      let company = await Company.findOne({ 'linkedIn.name': companyName });
      if (!company) {
        company = new Company({ linkedIn: { name: companyName } });
        await company.save();
      }

      user.linkedIn.company = company._id;
    }
  }

  await user.save();

  let userResult = {
    name: {
      first: user.name.first,
      last: user.name.last,
    },
    company: { id: companyId, name: companyName },
    nickname: user.nickname,
    role: user.linkedIn.role,
    roleType: user.linkedIn.roleType,
    blacklistedCompanies: user.linkedIn.blacklistedCompanies,
  };

  return userResult;
};

auth.login = async ({ accessCode, linkedInRedirectUrl }) => {
  if (!accessCode) {
    throw new Error('No access code passed');
  } else if (!linkedInRedirectUrl) {
    throw new Error('No linkedin redirect url passed');
  }

  debug('login');

  const authRes = await axios.post(
    'https://www.linkedin.com/oauth/v2/accessToken', 
    querystring.stringify({
      grant_type: 'authorization_code',
      code: accessCode,
      redirect_uri: linkedInRedirectUrl,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  );

  if (!authRes || !authRes.data.access_token) {
    throw new Error('No jwt token returned');
  }

  const accessToken = authRes.data.access_token;
  const expiresIn = authRes.data.expires_in;
  const userRes = await axios.get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,positions,public-profile-url,email-address)?format=json', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userRes || !userRes.data.id) {
    throw new Error('No valid user data returned');
  }

  const user = await createOrUpdate(userRes.data, {
    accessToken,
    expiresIn,
  });
  if (!user) {
    throw new Error('User create or update failed');
  }

  user.token = generateToken(user);

  return user;
};

module.exports = auth;

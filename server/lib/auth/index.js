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

/**
 *  @param   user       object
 *  @param   expiresIn  number of seconds
 */
const generateToken = (user, expiresIn) => {
  const payload = {
    user,
    iss: 'snailed',
    sub: 'general',
    version: 'v1',
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * @param   positionData    Array positions.values
 * raw positions: {
      _total: 1, values: [{
        company: { name: 'AutoFi' },
        id: 1261683673,
        isCurrent: true,
        location: { country: [Object], name: 'San Francisco Bay Area' },
        startDate: { month: 3, year: 2018 },
        title: 'Engineering Manager',
      }]
    },
 */
const parsePositionData = async positionData => {
  if (!positionData || !positionData.length) {
    return;
  }

  const currentPosition = positionData.find(p => p.isCurrent);
  const role = currentPosition.title;
  const location = currentPosition.location.name;
  const companyName = currentPosition.company.name;
  
  let companyId;
  if (companyName) {
    let company = await Company.findOne({ 'linkedIn.name': companyName });
    if (!company) {
      company = new Company({ linkedIn: { name: companyName } });
      await company.save();
    }

    companyId = company._id;
  }

  const parsed = {
    role,
    location,
    companyName,
    companyId,
  };

  return parsed;
};

/**
 * userData: {
    emailAddress: '*****@gmail.com',
    firstName: 'V****',
    id: 'QN89bvi1HJ',
    lastName: 'G***',
    positions: {...},
    publicProfileUrl: 'https://www.linkedin.com/in/v****-g***-b8995427',
  }
 */
const createOrUpdate = async (userData, { accessToken, accessExpiresIn }) => {
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
  user.linkedIn.accessExpiresTs = moment().add(accessExpiresIn, 'seconds');

  const currentPosition = await parsePositionData(userData.positions.values);
  user.linkedIn.role = currentPosition.role;
  user.linkedIn.location = currentPosition.location;
  
  if (user.linkedIn.company !== currentPosition.companyId) {
    user.linkedIn.company = currentPosition.companyId;
    
    const isNewCompanyBlacklisted = user.linkedIn.blacklistedCompanies.some(c => c.equals(currentPosition.companyId));
    if (!isNewCompanyBlacklisted) {
      user.linkedIn.blacklistedCompanies.push(currentPosition.companyId);
    }
  }

  await user.save();

  let userResult = {
    id: user._id,
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
    throw new Error('No access token returned');
  }

  const accessToken = authRes.data.access_token;
  const accessExpiresIn = authRes.data.expires_in;
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
    accessExpiresIn,
  });
  if (!user) {
    throw new Error('User create or update failed');
  }

  const THREE_MONTHS = (60 * 60 * 24) * 30 * 3;
  const token = generateToken(user, THREE_MONTHS);
  const expiresIn = THREE_MONTHS;

  return { token, expiresIn };
};

module.exports = auth;

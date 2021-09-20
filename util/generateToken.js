const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(16).toString('hex');

module.exports = generateToken;
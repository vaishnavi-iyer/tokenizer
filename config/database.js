const loki = require('lokijs');

const db = new loki('tokenDatabase.json');

module.exports = db;
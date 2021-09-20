const loki = require('lokijs');
const db = new loki('tokenDatabase.json');

const tokenList = db.addCollection('tokenList', {
    unique: ['accountNumber', 'token']
});

db.saveDatabase();

module.exports = tokenList;
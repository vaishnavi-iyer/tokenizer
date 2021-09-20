const express = require('express');
const router = express.Router();
const tokenList = require('./database.js');
var generateToken = require('./util/generateToken');

router.get('/', (req, res) => {
    res.send('Hello World!')
})
  
router.post('/tokenize', (req, res) => {
    const accountNumbers = req.body.input;
    let result = [];
    accountNumbers.map(accountNumber => 
      {
        if (tokenList.by("accountNumber", accountNumber)){
          const token = tokenList.find({accountNumber})[0].token;
          result.push(token);
        } else {
          const token = generateToken();
          tokenList.insert({accountNumber, token})
          result.push(token);
        }
      })
    res.json(result);
})
  
router.post('/detokenize', (req, res) => {

    const tokens = req.body.input;
    let result = [];
    tokens.map(token => 
      {
        if (tokenList.by("token", token)){
          const accountNumber = tokenList.find({token})[0].accountNumber;
          result.push(accountNumber);
        } else {
            console.log('token doesnot exist', token);
        }
      })
    res.json(result);
})

module.exports = router;
const express = require('express');

const emojis = require('./emojis');
const nba = require('./nba');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/nba', nba);

module.exports = router;

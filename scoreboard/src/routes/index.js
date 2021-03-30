const express = require('express');
const router = express.Router();
const route = require('./route');

router.use('/api',route);

module.exports = router;
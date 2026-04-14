const express = require('express');
const router = express.Router();

const { checkScam } = require('../controllers/scamController');

router.post('/', checkScam);

module.exports = router;
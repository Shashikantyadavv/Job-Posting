const express = require('express');
const { createJob } = require('../controllers/jobController');
const auth = require('../middleware/auth'); 

const router = express.Router();

router.post('/', auth, createJob);

module.exports = router;

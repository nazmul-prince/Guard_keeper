const express = require('express');
const guardRoutes = require('./guards/guards');

//initial config
const router = express.Router();

router.use('/guards', guardRoutes);

module.exports = router;
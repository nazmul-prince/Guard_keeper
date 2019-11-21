const express = require('express');

const privateRoutes = require('./private');

const router = express.Router();

router.use('/private', privateRoutes);

module.exports = router;
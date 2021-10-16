const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post( "/", controller.postRegister );
router.get ( "/", controller.getRegister  );

module.exports = router;
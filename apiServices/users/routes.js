//const express = require('@awaitjs/express');
//const controller = require('./controller');
const express = require('express');
const controller = require('./controller.js');

const router = express.Router();

//router.getAsync('/', controller.getUsers);
//router.postAsync('/', controller.createUser);
router.get(    '/', controller.getUser     );
router.post(   '/', controller.createUser  );
router.patch(  '/', controller.updateUser  );
router.delete( '/', controller.deleteUser  );

module.exports = router;
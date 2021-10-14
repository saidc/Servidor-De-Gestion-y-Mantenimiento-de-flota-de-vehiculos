const express = require('@awaitjs/express');
const controller = require('./controller');

const router = express.Router();

//router.getAsync('/', controller.getUsers);
//router.postAsync('/', controller.createUser);
router.getAsync(    '/', controller.getUser     );
router.postAsync(   '/', controller.createUser  );
router.patchAsync(  '/', controller.updateUser  );
router.deleteAsync( '/', controller.deleteUser  );

module.exports = router;
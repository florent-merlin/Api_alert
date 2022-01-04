const router = require('express').Router();
const authCtrl = require('../../controllers/authCtrl');

router.post('/login', authCtrl.loginUser);


module.exports = router;
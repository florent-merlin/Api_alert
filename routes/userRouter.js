const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/users/', userCtrl.getAllUsers)
router.get('/user/:id', userCtrl.userInfo)

router.post('/register', userCtrl.registerUser)
router.put('/updateUser/:id', userCtrl.updateUser)
router.delete('/deleteUser/:id', userCtrl.deleteUser)

// Roles ('User','Admin','SuperAdmin')




module.exports = router;
const router = require('express').Router();
const alertCtrl = require('../controllers/alertCtrl');

// creation de compte utilisateur
router.post('/createAlert/:id', alertCtrl.createAlert);

// voir "un" ou "tout" les utilisateurs
router.get('/alert', alertCtrl.getAllAlerts);
router.get('/alert/:id', alertCtrl.alertInfo);

// modification et suppression de compte utilisateur par l'id
router.put('/updateAlert/:id', alertCtrl.updateAlert);
router.delete('/deleteAlert/:id', alertCtrl.deleteAlert)// router.post('/admin', alertCtrl.deletAlert)
// router.post('/admin', alertCtrl.deletAlert)
// router.post('/admin', alertCtrl.deletAlert)

// router.post('/superAdmin', alertCtrl.deletAlert)
// router.post('/superAdmin', alertCtrl.deletAlert)
// router.post('/superAdmin', alertCtrl.deletAlert)



module.exports = router;

const userModel = require('../models/userModel');
const alertModel = require('../models/alertModel');
const ObjectId = require('mongoose').Types.ObjectId;



module.exports.getAllAlerts = async (req, res) => {
   
    const alerts = await alertModel.find().select();
    res.status(200).json(alerts);
}

module.exports.alertInfo = (req, res) => {

    alertModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        } else {
            console.log('ID unknown : ' + err)
        }
    }).select();
}

module.exports.createAlert = async (req, res) => {
    
    const user = await userModel.findOne({_id: req.params.id})
    
    if(user){
        const newAlert = new alertModel({
            // name: req.body.name,
            // lastName: req.body.lastName,
            // phone:req.body.phone,
            type:req.body.type,
            description:req.body.description,
            alertAdress:req.body.alertAdress,
            codePostal:req.body.codePostal,
            adress: req.body.adress,
            city:req.body.city
        })
        newAlert.save((err, alert) => {
            if(err) {
                res.status(500).json({ message: "Erreur! Echec, creation d'alert" })
            } else{
                res.status(201).json({ message: "Création de l'alerte réussie", alert })
            }
        })
    } else {
        res.status(401).json({ message: "veuillez vous connecter afin de pouvoir créer une alert" })
    }
}

module.exports.updateAlert = async (req, res) => {
    // if (!ObjectId.isValid(req.params.id)){
    //     return res.status(400).send('ID unkknow : ' + req.params.id)
    // }
    
    try {
        const {type, description} = req.body
        await alertModel.findOneAndUpdate({type, description
        })

        res.json({msg: `modificatiion de l'alerte ${req.params.id} réussie`})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
}

module.exports.deleteAlert = async (req, res) => {
    try {
        await alertModel.findOneAndDelete(req.params.id) 

        res.json({msg: "Alerte supprimé avec succès!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

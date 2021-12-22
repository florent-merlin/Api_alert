const userModel = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.registerUser = async (req, res) => {
    const { pseudo,name,lastName,adress,codePostal,city,phone,email,password } = req.body

    try {
        const user = await userModel.create({
            pseudo,name,lastName,adress,codePostal,city,phone,
            email,
            password,
        });

        if (user) {
            return res.status(200).json({message:'compte utilisateur créé', user: user._id })
        } else {
            return res.status(404).json({ status: '404 Not Found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send('ID unkknow : ' + req.params.id)
    }

    userModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        } else {
            console.log('ID unknown : ' + err)
        }
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send('ID unkknow : ' + req.params.id)
    }
    try {
        const {pseudo, adress, codePostal, city, phone, email, password} = req.body

        await userModel.findOneAndUpdate({pseudo,adress, codePostal, city, phone, email, password})

        res.json({msg: 'information user modifié avec succès'})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
}

module.exports.deleteUser = async (req, res) => {
    try {
        await userModel.findOneAndDelete(req.params.id) 
        
        res.json({msg: "votre compte est suprimé !"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

// module.exports.updateUsersRole = async (req, res) => {
//     try {
//         const {role} = req.body

//         await users.findOneAndUpdate({_id: req.params.id},  {
//             role
//         })

//         res.json({msg: "update, success!"})
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// },

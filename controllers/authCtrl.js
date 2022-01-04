const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.loginUser = async (req, res) => {
    const {pseudo, email, password} = req.body

    if(!pseudo || !email || !password) {
        return res.status(401).json({ message: 'Pseudo,Mot de passe ou email incorrect' 
    })
    }
    try {
		const {pseudo, email, password} = req.body;
		const user = await userModel.findOne({pseudo: pseudo , email: email});
		const isMatch = await bcrypt.compare(password, user.password);
	
		if (!pseudo) {return res.status(400).json({ msg: "Pseudo incorrect !" })};

		if (!email) {return res.status(400).json({ msg: "Ce mail n'existe pas !" })};
		
		if (!isMatch) {return res.status(400).json({ msg: 'Mot de passe incorrect !' })};
      
        res.status(200).json({ message:'connexion réussie'});

        

        } catch (error) {
            res.status(400).json({ error: error.message })
    }
}



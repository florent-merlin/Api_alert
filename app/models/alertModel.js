const mongoose = require('mongoose');

// formulaire de signalement
const alertSchema = new mongoose.Schema(
	{
		//les champs classiques
		//(nom, prenom, adresse, cp, ville, email, téléphone)
		
		// firstName: {
		// 	type: String,
		// },
		// lastName: {
		// 	type: String,
		// 	required: [true, "Merci d'indiquer votre nom de famille"],	
		// },
		// phone:{
		// 	type: String,
		// 	required: true,	
		// },
		// adress: {
		// 	type: String,
		// 	required: true,	
		// },
		type:{
			type: String,
			required: true,	
		},
		description:{
			type: String,
			required: true,	
		},
		alertAdress:{
			type: String,
			required: true,	
		},
		codePostal:{
			type: String,
			required: true,	
		},
		city:{
			type: String,
			required: true,	
		},
		// mapAdress:{
		// 	lon: Number,
		// 	lat: Number,
		// },
		// picture:{
		// }
		// movie:{
		// 	type: String,
		// 	required: true,	
		// },
	},
	{
		timestamps: true,
	}
);

const alertModel = mongoose.model('alert', alertSchema);
module.exports = alertModel;
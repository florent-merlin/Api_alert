const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

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
		location:{
		    type: {
                type: String,
		        enum: ['point']
		    },
		    coordinates: {
			    type: [Number],
			    index: '2dsphere'
		    },
		    formattedAddress: String,
		}
		// movie:{
		// 	type: String,
		// 	required: true,	
		// },
	},
	{
		timestamps: true,
	}
);

// Geocode & create location
alertSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.alertAdress);
    this.location = {
		type: 'Point',
		coordinates: [loc[0].latitude, loc[0].longitude],
		// formattedAddress: loc[0].formattedAddress
	}
	
	this.alertAdress = undefined;
	next();
	console.log(loc);
});

const alertModel = mongoose.model('alert', alertSchema);
module.exports = alertModel;
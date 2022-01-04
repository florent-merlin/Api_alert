const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
	{
		pseudo:{
			type: String,
			require: [true, 'Pseudo'],
			minlength: 3,
			maxlength: 55,
			unique: true,
			trim: true,
		},
		name: {
			type: String,
			require: [true, 'Prénom'],
		},
		lastName: {
			type: String,
			require: [true, 'Nom de famille'],
		},
		adress: {
			type: String,
			require: true,
		},
		codePostal: {
			type: String,
			require: true,
		},
		city: {
			type: String,
			require: true,
		},
		phone: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [isEmail, 'Adresse email incorrecte! Entrer une nouvelle adresse.'],
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			max: 1024,
			minlength: 6,
		},
		picture: {
			type: String,
			// default:""
		},
	},
	{
		timestamps: true,
	}
);

// fonction de cryptage de mdp
userSchema.pre('save', async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(this.password, salt);
			this.password = hashedPassword;
		}
	} catch (err) {
		next(err);
	}
});

// fonction de vérification de mdp
userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

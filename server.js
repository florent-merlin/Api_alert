require('dotenv').config();
const expess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const authRouter = require('./routes/authRouter');
const alertRouter = require('./routes/alertRouter');
const userRouter = require('./routes/userRouter');


const app = expess();
app.use(expess.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/', authRouter);
app.use('/', alertRouter);
app.use('/', userRouter);

const port = process.env.PORT || 3500;

const start = async () => {
	try {
		await connectDB();
		console.log('Connecting to mongoDB');
		app.listen(port, () => console.log(`server started on port: ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();

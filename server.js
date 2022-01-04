require('dotenv').config();
const expess = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./app/config/dbConfig');
const authRouter = require('./app/routes/authRouter');
const alertRouter = require('./app/routes/alertRouter');
const userRouter = require('./app/routes/userRouter');


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

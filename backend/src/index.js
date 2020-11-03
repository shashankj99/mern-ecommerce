/**
 * @description This is the main server file
 * @author Shashank Jha
 */

// get all the libraries
const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const authRoutes = require('./routes/auth');

// bootstrap the server
const app = express();

// configure all the environment variables
env.config();

// mongo DB connection string
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mjtow.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}).then(() => {
   console.log('DB Connected');
}).catch(err => {
   console.log(err.message);
});

// middleware to parse the body into json
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

// add /api prefix to the routes
app.use('/api', authRoutes);

// listen to the port
app.listen(process.env.PORT, () => {
   console.log(`Server is running on port: ${process.env.PORT}`);
});

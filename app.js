const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoute = require('./routes/admin');
const userRoutes = require('./routes/user');
const acctRoutes = require('./routes/account');
const articleRoutes = require('./routes/article');
const gifRoutes = require('./routes/gifs');
const centralRoutes = require('./routes/feed');


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
})



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  	response.json({ info: 'Node.js, Express, and Postgres API' })
});

// Admin SignIn
app.use('/api/v1/admin', adminRoute);

// Account Signup and Login
app.use('/api/v1/auth/', acctRoutes);

// Getting and Modifying users
app.use('/api/v1/getAllUsers', userRoutes);
app.use('/api/v1/getUserById', userRoutes);
app.use('/api/v1/updateUser', userRoutes);
app.use('/api/v1/deleteUser', userRoutes);


//  Articles
app.use('/api/v1/articles', articleRoutes);

// GIFs
app.use('/api/v1/gifs', gifRoutes);

// Central Middleware for Article and GIFs
app.use('/api/v1/feed', centralRoutes);

module.exports = app;
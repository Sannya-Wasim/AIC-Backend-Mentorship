const express = require('express');
const app = express();

// Importing User Route
const userRoute = require('./routes/userRoutes.js')

// Setting up middleware
app.use('/users', userRoute)
// since here we have already specified that when /users is called, fetch the user.js 
// therefore we will remove all these routes i.e /users from user.js and just set it to parent /

const port = process.env.PORT || 3000;
app.listen(3000, ()=> console.log(`Listening on port ${port}...`));

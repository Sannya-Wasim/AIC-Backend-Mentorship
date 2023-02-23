const express = require("express");
// express removes repititions commonly found if we use https server

// creating server by the name of app
const app= express();
// creating a variable for your port
const port= 5000;

// when we define data as json, we need to first parse it
// first we need to define the middleware
// MIDDLEWARE are functions that are beign called when server erecieves requests
// in the above app.get, the func as the 2nd arg is its middleware
const bodyParserMiddleware = express.json({}) //basically this function parses all the middlewares(funcs) globally
app.use(bodyParserMiddleware);
// since we havent deinded a specific route or method, it will run on global level, doesnt need a middleware to run itself, run for any route or method
// server will then move to next middleware

// CREATING A CUSTOMISED MIDDLEWARE
const myMiddleware= (req, res, next)=>{
    console.log("This is our custom middleware");
    // performing some  validatiions
    // if(req.header["Authorization"]) {
    //     ....
    // } else {
    //     .....
    // }
    next();
}
app.use(myMiddleware);

// we need to specify to our middleware the next middleware that after running itself, go to another, which is in our case is app.get

// creating a path
const path = require("path");

// Purpose of servers
// servers are serving your data to the user(client), providing information
// server serves at particular ports, we make a request and our server listens to that port
app.listen(port, ()=>{
    console.log(`server started listening at port ${port}`)
});

// SERVER METHODS
// C    GET -> to return something from the server/basically used to send headers containing info about server
// R    POST -> website sends data and server will store that data and either it will do something on it and then send back to client/ mainly used to send payload(data)
// U    PUT -> update the data/resource
// D    DELETE -> delete something

// route -> url

// CREATING REST APIS
// what i we want to call get?
// this meth0od/action is performed on a particular route
app.get('/hello', (req, res)=>{
    // res.send("Hello from Express!")
    // res.status(404).json({data:"Hello from express"});
    const indexFilePath = path.resolve(__dirname, './index.html');
    res.sendFile(indexFilePath);
})
// our 2nd argument will take a function that is something to be performed on that route
// this function will accept 3 args, request, response, next

// HTTP Statuscode
// 200 -> ok(success)
// 404 -> not found
// 500 -> internal server error

// POST Request
app.post('/hello', (req,res)=>{
    const data = req.body;
    res.status(404);
    res.json({data})
})

// create an architecture/ Controller Service Architecture
// controllers -> contains all the route handlers which are passed n routes
// routes -> containes all routes

// Task
// create a CRUD for eg students, books, courses

// make an array of books or create its json file and it returns by get request display all books
// get book by id => we mention id and it displays that particular book/query params and url params
// adding a new book-. json data and post it and as a resposne it will return those details
// updata(put req)->pass id and it will update that book by passing params
// delete req

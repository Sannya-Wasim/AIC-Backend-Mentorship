const express = require('express');
const router = express.Router();

// importing user route
userRoute = require('../controllers/usersController.js');

// mapping user controller onto user route
router.get("/", userRoute.userController)

/*
router.get("/", (req, res)=>{
    res.send({data : "Here is your data"});
})

router.post("/", (req, res)=>{
    res.send({data : "User created!"})
})

router.put("/", (req, res)=>{
    res.send({data : "User updated!"})
})

router.delete('/', (req, res)=>{
    res.send({data : "User deleted!"})
})
*/

// exporting user route
module.exports = router;
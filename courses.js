const Joi = require('joi');
const express= require('express');

const app= express();

app.use(express.json());

// array
const courses=[
    {
        id:1,
        name:'Software Construction and Development',
        teacher:'Zainab Fatima',
    },
    {
        id:2,
        name:'Programming Fundamentals',
        teacher:'Asma Khan',
    },
    {
        id:3,
        name:'Operating Systems',
        teacher:'Nudrat Naved',
    },
    {
        id:4,
        name:'Applied Economics for Engineers',
        teacher:'Sheerina Khattak',
    }
]

// Read
app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.get('/api/courses', (req,res)=>{
    res.send(courses);
})

app.get("/api/courses/:id", (req, res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course for the given id was not found')
})

// Create
app.post('/api/courses', (req, res)=>{
    // Validaion using JOI
    const {error} = validateCourse(req.body);
    // If invalid, return 404
    if (error) return res.status(400).send(result.error); //400 bad request

    const course = {
        id: courses.length+1,
        name:req.body.name,
        teacher: req.body.teacher,
    }
    courses.push(course);
    res.send(course);
})

// Update
app.put('/api/courses/:id', (req, res)=>{
    // Look up the course
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // If it does not exists, return 404
    if(!course) return res.status(404).send('The course for the given id was not found');
    
    // Validate 
    const result = validateCourse(req.body);
    // extracting its error using object destructuring
    const {error} = validateCourse(req.body);
    // If invalid, return 404
    if (error) return res.status(400).send(result.error); //400 bad request

    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
})

function validateCourse(course){
    // Validaion using JOI
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    // instead of the following
    // if (!req.body.name || req.body.name <3){
    //     //400 bad request
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return; 
    // }
    return schema.validate(course);
}

app.delete('/api/courses/:id', (req, res)=>{
    // Look up the course
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    // If it does not exists, return 404
    if(!course) return res.status(404).send('The course for the given id was not found')

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); // here 1 means to delete 1 object

    // Return the same course
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(3000, ()=> console.log(`Listening on port ${port}...`));
// Creating boilerplate
const express= require('express');
// creating the server
const app=express();
// adding middleware
app.use(express.json());
// creating a port
const port = process.env.PORT || 3000;
app.listen(3000, ()=> console.log(`Listening on port ${port}...`));

// creating our array
const tracks = [
    {
        id: 1,
        name : "Cry you a river",
    },
    {
        id : 2,
        name : "Pano"
    },
    {
        id: 3,
        name : "Give me your forever",
    },
    {
        id : 4,
        name : "Living Hell",
    }, {
        id : 5,
        name : "Vengeance",
    },
];

// Creating CRUD Methods
// GET method
app.get('/', (req, res)=>{
    res.send("Welcome to Music Library");
})
// Accessing all tracks
app.get('/tracks', (req, res)=>{
    res.send(tracks);
})
// Accessing tracks with ID
app.get('/tracks/:id', (req, res)=>{
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if (!track) return res.status(400).send("The track for the given id was not found")
    res.send(track); 
})

// POST method
app.post('/tracks', (req, res)=>{
    const track = {
        id : tracks.length + 1,
        name : req.body.name,
    }
    tracks.push(track);
    res.send(track);
});

// PUT Method
app.put('/tracks/:id', (req, res)=>{
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if (!track) return res.status(404).send("The track for the given id was not found");
    track.name = req.body.name;
    res.send(track);
})

// DELETE Method
app.delete('/tracks/:id', (req, res)=>{
    const track = tracks.find(t => t.id ===parseInt(req.params.body));
    if (!track ) return res.status(404).send("The track for the given id was not found");
    const index = tracks.indexOf(track);
    tracks.splice(index, 1);
    res.send(tracks);
})
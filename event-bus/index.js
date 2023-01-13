const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 4003;

app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);
    try{
        //posts service
        await axios.post('http://localhost:4000/events', event);
        
        //comments service 
        await axios.post('http://localhost:4001/events', event);
        
        //qury service
        await axios.post('http://localhost:4002/events', event);
        
        //moderation service
        await axios.post('http://localhost:4004/events', event);
    } catch(err){
        console.error(err);
    }
    res.send({status:"ok"});
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(PORT, () => {
    console.log(`we are listening to http://localhost:${PORT}/`)
});
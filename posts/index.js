const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts',(req,res)=>{
    res.json(posts);
});

app.post('/posts', async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {id, title};

    await axios.post('http://localhost:4003/events', {
        type: 'postCreated',
        data: {id, title}
    });

    res.status(201).json(posts);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send('done')
});

app.listen(PORT, () => {
    console.log(`we are listening to http://localhost:${PORT}/`)
});
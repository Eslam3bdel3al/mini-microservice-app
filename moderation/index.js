const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4004;


app.use(bodyParser.json());
app.use(cors());

const handleEvents = async (type, data) => {
    if (type === "commentCreated"){
        const status = data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://localhost:4003/events', {
        type:"commentModerated",
        data:
            {
                id:data.id,
                content:data.content,
                postId:data.postId,
                status
            }
    })
}
}

app.get('/', (req, res) => {
    res.send('tmam');
})

app.post('/events', async (req, res) => {
    const {type,data} = req.body;
    handleEvents(type, data);
    res.send("done");
});

app.listen(PORT, async () => {
    console.log(`we are listening to http://localhost:${PORT}/`);
    const res = await axios.get('http://localhost:4003/events');
    for (let event of res.data){
        console.log('processing event', event.data);
        handleEvents(event.type, event.data); 
    }

});
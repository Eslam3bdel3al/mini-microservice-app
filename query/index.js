const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 4002;

const posts = {};

// example 
// posts === {
//     "j123j45":{
//         id: "j123j45",
//         title: "post title",
//         comments: [
//             {id:"n458y89", content: "comment!", status: "pending" || "approved" || "rejected"}
//         ]
//     }
// }

app.use(bodyParser.json());
app.use(cors());


const handleEvents = (type, data) => {
    if (type === "postCreated"){
        const {id, title} = data;
        posts[id] = {id, title, comments: []}; 
    }

    if(type === "commentCreated"){
        const {id, content, status,postId} = data;
        posts[postId].comments.push({id,content,status});
    }
    
    if(type === "commentUpdated"){
        const {id, content, status, postId} = data;
        const comments = posts[postId].comments;
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    handleEvents(type, data);
    res.send("query service resieved the event and dealt with it");
});


app.listen(PORT, async  () => {
    console.log(`we are listening to http://localhost:${PORT}/`);
    const res = await axios.get('http://localhost:4003/events');
    for (let event of res.data){
        console.log('processing event', event.data);
        handleEvents(event.type, event.data); 
    }

});
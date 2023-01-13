const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
const { type } = require('os');

const app = express();
const PORT = 4001;

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:postId/comments',(req,res)=>{
    const {postId} = req.params;
    res.json(commentsByPostId[postId] || []);
});

app.post('/posts/:postId/comments', async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {content} = req.body;
    const {postId} = req.params;

    const comments = commentsByPostId[postId] || [];
    comments.push({id, content, status:'pending'});
    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4003/events',{
        type: 'commentCreated',
        data:  {id, content, status: 'pending',postId}});

    res.status(201).json(commentsByPostId[postId]);
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    const {type, data} = req.body;

    if (type === "commentModerated"){
        const {id, postId, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment=>{
            return comment.id === id;
        });
        comment.status = status;
    
        await axios.post('http://localhost:4003/events',{
            type: 'commentUpdated',
            data:  {id, content, status: comment.status ,postId}});
    }
    res.send('done');
    
});

app.listen(PORT, () => {
    console.log(`we are listening to http://localhost:${PORT}/`)
});
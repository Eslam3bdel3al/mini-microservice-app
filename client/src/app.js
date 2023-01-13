import React, { useEffect, useState } from "react";
import axios from 'axios';

import PostCreate from "./postCreate";
import PostList from "./postList";

export default () => {
    const [Title, setTitle] = useState('');
    const [posts, setPosts] = useState({});
    
    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://localhost:4000/posts', {title: Title});
        setTitle("");
        fetchPosts();
    }

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();
    },[])

    return <div className="container">
        <h1>Create post</h1>
        <PostCreate handlesubmit = {handlesubmit} handleChange={handleChange} title = {Title}/>
        <hr/>
        <h1>Posts</h1>
        <PostList posts = {posts} fetchPosts={fetchPosts}/>
    </div>;
}
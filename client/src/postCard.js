import React, {useState} from "react";
import axios from "axios";

import CommentCreate from './commentCreate';
import CommentList from './commentList';

export default ({post, fetchPosts})=>{

    const [content, setContent] = useState();

    const handleContentchange = (e)=>{
        setContent(e.target.value);
    }

    const handleComment = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${post.id}/comments`, {content});
        setContent("");
        fetchPosts();
    }

    return <div className='card' style={{width:'30', marginBotton: '20px'}} key={post.id}>
    <div className='card-body'>
        <h3>{post.title}</h3>
        <CommentList comments = {post.comments || []}/>
        <CommentCreate content = {content} handleContentchange = {handleContentchange} handleComment = {handleComment} postId = {post.id}/>
    </div>
    </div>
}
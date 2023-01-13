import React from 'react';

import PostCard from './postCard';

export default (props)=>{
  
    const renderedPosts = Object.values(props.posts).map(post => {
        return <PostCard post = {post} fetchPosts = {props.fetchPosts}/>
    });

    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}</div>
}
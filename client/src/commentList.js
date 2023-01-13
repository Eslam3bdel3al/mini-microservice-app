import React from 'react';

export default (props) => {
   
    const renderedComments = Object.values(props.comments).map(comment => {

        let content;

        if (comment.status === 'approved'){
            content = comment.content;
        }

        if (comment.status === "rejected"){
            content = "this comment has been rejected";
        }

        if (comment.status === "pending"){
            content = "a comment that is under moderation";
        }

        return <li key={comment.id}>
            {content}
        </li>
    })
    return <ul>
        {renderedComments}
    </ul>
}
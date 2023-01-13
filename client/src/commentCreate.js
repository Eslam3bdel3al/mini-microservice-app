import React from "react";

export default (props) => {

    return <div>
        <form onSubmit={props.handleComment}>
            <div className="form-group my-1">
                <label>New comment</label>
                <input value={props.content} onChange={props.handleContentchange} className="form-control"/>
            </div>
            <button className="btn btn-primary">Comment</button>
        </form>
    </div>
}
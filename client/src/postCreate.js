import React from "react";

export default (props) => {

    return <div>
        <form onSubmit={props.handlesubmit}>
            <div className="form-group my-1">
                <label>Title</label>
                <input value={props.title} onChange={props.handleChange} className="form-control"/>
            </div>
            <button className="btn btn-primary">submit</button>
        </form>
    </div>;
}
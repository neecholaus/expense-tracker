import React, {Component} from 'react';
import './Error.css';

class Error extends Component {
    render() {
        const {id, content} = this.props.error;

        return (
            <div className="appError" onClick={this.props.removeError.bind(this, id)}>
                <p>{content}</p>
            </div>
        )
    }
}

export default Error;

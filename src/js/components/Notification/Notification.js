import React, {Component} from 'react';
import './Notification.css';

class Notification extends Component {
    render() {
        const {id, type, content} = this.props.notif,
            classes = ["notif", `notif-${type}`].join(' ');

        return (
            <div
                className={classes}
                onClick={this.props.removeNotif.bind(this, id)}>
                <p>{content}</p>
            </div>
        )
    }
}

export default Notification;

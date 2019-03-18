import React, {Component} from 'react';
import './Expense.css';

class Expense extends Component {
    render() {
        return (
            <div className="expense">
                <div className="primary-details">
                    <label className="title">{this.props.title}</label>
                    <h3 className="amount">{this.props.amount}</h3>

                    <span className="indicator">
                        <i className="fa fa-caret-down" />
                    </span>
                </div>

                <div className="secondary-details">
                    
                </div>
            </div>
        )
    }
}

export default Expense;

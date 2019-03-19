import React, {Component} from 'react';
import './Expense.css';

class Expense extends Component {
    state = {
        expanded: false,
        expenseClassName: ['expense']
    }

    expand = () => {
        if(this.isExpanded()) {
            this.setState({
                expenseClassName: this.state.expenseClassName.filter(str => str !== 'expanded')
            })
        } else {
            this.setState({
                expenseClassName: [...this.state.expenseClassName, 'expanded']
            })
        }
    }

    isExpanded = () => {
        return this.state.expenseClassName.indexOf('expanded') !== -1;
    }

    render() {
        return (
            <div
                className={this.state.expenseClassName.join(' ')}
                onClick={this.expand}>
                <div className="primary-details">
                    <label className="title">{this.props.title}</label>
                    <h3 className="amount">{this.props.amount}</h3>

                    <span className="indicator">
                        <i className="closed fa fa-caret-down" />
                        <i className="expanded fa fa-caret-up" />
                    </span>
                </div>

                <div className="secondary-details">
                    <p className="m-0">Purchased: <b>N/A</b></p>
                    <p className="m-0">Category: <b>N/A</b></p>
                </div>
            </div>
        )
    }
}

export default Expense;

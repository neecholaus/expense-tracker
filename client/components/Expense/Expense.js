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

    amountToStr = int => {
        const str = int.toString();

        let split = [...str];

        while(split.length < 4) split.unshift('0');

        split.splice(-2, 0, '.');

        return `$${split.join('')}`;
    }

    render() {
        const {...expense} = this.props.expense;

        return (
            <div
                className={this.state.expenseClassName.join(' ')}
                onClick={this.expand}>
                <div className="primary-details">
                    <label className="title">
                        {expense.title}
                    </label>
                    <h3 className="amount">
                        {this.amountToStr(expense.amount)}
                    </h3>

                    <span className="indicator">
                        <i className="closed fa fa-caret-down" />
                        <i className="expanded fa fa-caret-up" />
                    </span>
                </div>

                <div className="secondary-details">
                    <p className="m-0">Category: <b>{expense.category}</b></p>
                </div>
            </div>
        )
    }
}

export default Expense;

import React, {Component} from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    state = {
        title: '',
        amount: '',
        category: ''
    }

    validations = {
        amount: amount => {
            const formattedAmount = this.amountToInt(this.state.amount);
            const positive = formattedAmount > 0;

            if(!positive) {
                // this.props.emitError('Amount must be a positive value.');
                return false;
            }

            if(typeof(formattedAmount) !== 'number') {
                // this.props.emitError('Amount could not be evaluated properly.');
                return false;
            }

            return true;
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
        console.log(this.props);
    }

    addExpense = () => {
        let expense = {
            title: this.state.title,
            amount: this.amountToInt(this.state.amount),
            category: this.state.category,
            created_at: new Date()
        };

        if(this.expenseIsValid(expense)) {
            this.props.addExpense(expense);
            this.setState({
                title: '',
                amount: '',
                category: ''
            })
        } else {
            this.props.emitError('Inputs were invalid.');
        }
    }

    /**
     *  Returns a boolean whether or not all fields have been occupied
     */
    expenseIsValid = expense => {
        let valid = true;

        Object.keys(expense).map(key => {
            if(this.validations[key]) {
                valid = this.validations[key](expense[key]);
            } else {
                valid = expense[key] == '' ? false : valid
            }
        });

        return valid;
    }

    /**
     *  Returns an integer formatted as US cents.
     *  @param string
     */
    amountToInt = amount => {
        let inc = amount.split('.');

        if(inc.length < 2) inc.push('00');

        while(inc[inc.length - 1].length < 2) inc[inc.length - 1] += '0';

        return parseInt(inc.join('').replace(/\D/g, ''));
    }

    render() {
        return (
            <div id="control-panel-container">
                <h2>Add an Expense</h2>
                <div id="details">
                    <input
                        type="text"
                        name="title"
                        className="styled mb-10"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.onChange}
                        />
                    <input
                        type="text"
                        name="amount"
                        className="styled mb-10"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                        />
                </div>
                <div id="details">
                    <input
                        type="text"
                        name="category"
                        className="styled mb-10"
                        placeholder="Category"
                        value={this.state.category}
                        onChange={this.onChange}
                        />
                </div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.addExpense}>
                        <i className="icon mr-10">&#43;</i> Add
                    </button>
                </div>
            </div>
        )
    }
}

export default ControlPanel;

import React, {Component} from 'react';
import './ControlPanel.css';
import Expense from '../../interfaces/Expense';

class ControlPanel extends Component {
    state = {
        title: '',
        amount: '',
        category: ''
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    addExpense = () => {
        let expense = new Expense();
        expense.title = this.state.title;
        expense.amount = this.state.amount;
        expense.category = this.state.category;

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
        // valid until proven invalid
        let valid = true;

        Object.keys(expense).map(key => {
            valid = expense[key] == '' ? false : valid
        })

        return valid;
    }

    render() {
        return (
            <div id="control-panel-container">
                <h2>Controls</h2>
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

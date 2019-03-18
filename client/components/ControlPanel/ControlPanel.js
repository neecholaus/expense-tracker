import React, {Component} from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    state = {
        title: '',
        amount: '',
        description: ''
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    addExpense = () => {
        this.props.addExpense(this.state);
        this.setState({
            title: '',
            amount: '',
            description: ''
        })
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
                    <textarea
                        name="description"
                        className="styled mb-10"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onChange}
                        rows="3"
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

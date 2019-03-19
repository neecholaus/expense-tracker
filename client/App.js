import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Global.css';
import './App.css';

import ControlPanel from './components/ControlPanel/ControlPanel';
import History from './components/History/History';

class App extends Component {
    state = {
        expenses: []
    }

    addExpense = expense => {
        expense.id = new Date().getTime();

        this.setState({
            expenses: [...this.state.expenses, expense]
        });
    }

    render() {
        return (
            <div id="pagewrapper">
                <div id="header" className="p-50">
                    <h1 className="m-0">Track Your Expenses</h1>
                </div>
                <div id="main-container">
                    <ControlPanel
                        addExpense={this.addExpense} />
                    <History
                        expenses={this.state.expenses} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

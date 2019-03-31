import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Global.css';
import './App.css';

import ControlPanel from './components/ControlPanel/ControlPanel';
import History from './components/History/History';
import Error from './components/Error/Error';

class App extends Component {
    state = {
        expenses: [],
        errors: []
    }

    addExpense = expense => {
        expense.id = new Date().getTime();
        this.setState({
            expenses: [...this.state.expenses, expense]
        }, this.syncStateToLocal);
    }

    removeExpense = id => {
        this.setState({
            expenses: this.state.expenses.filter(expense => expense.id !== id)
        }, this.syncStateToLocal);
    }

    emitError = error => {
        let id = new Date().getTime();

        this.setState({
            errors: [...this.state.errors, {id, content: error}]
        })

        this.dispatchErrorRemoval(id);
    }

    removeError = id => {
        this.setState({
            errors: this.state.errors.filter(error => error.id !== id)
        })
    }

    dispatchErrorRemoval = id => {
        setTimeout(() => {
            this.removeError(id);
        }, 3500);
    }

    ensureLocalStorage = () => {
        const ls = window.localStorage, str = 'expenses';

        if(!ls.getItem(str)) ls.setItem(str, JSON.stringify([]));

        this.syncLocalToState();
    }

    syncStateToLocal = () => {
        const ls = window.localStorage;

        ls.setItem('expenses', JSON.stringify(this.state.expenses));
    }

    syncLocalToState = () => {
        const ls = window.localStorage;

        const data = JSON.parse(ls.getItem('expenses'));

        this.setState({expenses: data});
    }

    componentDidMount = () => {
        this.ensureLocalStorage();
    }

    render() {
        return (
            <div id="pagewrapper">
                <div id="header" className="p-50">
                    <h1 className="m-0"></h1>
                </div>
                <div id="main-container">
                    <ControlPanel
                        addExpense={this.addExpense}
                        emitError={this.emitError} />
                    <History
                        expenses={this.state.expenses}
                        removeExpense={this.removeExpense} />
                </div>

                <div id="appErrors">
                    {this.state.errors.map(error => {
                        return (
                            <Error
                                key={error.id}
                                error={error}
                                removeError={this.removeError} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

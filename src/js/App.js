import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink as Link} from "react-router-dom";
import '../Global.css';
import '../App.css';

import Dashboard from './components/Dashboard/Dashboard';
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

    componentWillMount = () => {
        this.ensureLocalStorage();
    }

    render() {
        return (
            <div id="pagewrapper">
                <div id="header" className="p-10 pl-20">
                    <h3 className="m-0">
                        Expense Tracker
                    </h3>
                </div>

                <div id="main-container">
                    <Router>
                        <div className="bg-light" id="nav">
                            <Link
                                to="/"
                                exact
                                className="nav-item"
                                activeClassName="active">Dashboard</Link>
                            <Link 
                                to="/add/" 
                                className="nav-item"
                                activeClassName="active">Add</Link>
                            <Link 
                                to="/history/" 
                                className="nav-item"
                                activeClassName="active">History</Link>
                        </div>

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Dashboard
                                    expenses={this.state.expenses} />
                            )}
                        />
                        <Route 
                            path="/add/"
                            render={() => (
                                <ControlPanel 
                                    addExpense={this.addExpense}
                                    emitError={this.emitError} />
                            )}
                        />
                        <Route 
                            path="/history/"
                            render={() => (
                                <History 
                                    expenses={this.state.expenses}
                                    removeExpense={this.removeExpense} />
                            )} />
                    </Router>
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

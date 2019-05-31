import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink as Link} from "react-router-dom";
import '../Global.css';
import '../App.css';

import Dashboard from './components/Dashboard/Dashboard';
import ControlPanel from './components/ControlPanel/ControlPanel';
import History from './components/History/History';
import Notification from './components/Notification/Notification';

class App extends Component {
    state = {
        expenses: [],
        errors: [],
        notifs: []
    }

    addExpense = expense => {
        expense.id = new Date().getTime();
        this.setState({
            expenses: [...this.state.expenses, expense]
        }, this.syncStateToLocal);

        this.emitNotif({
            type: 'success',
            content: 'Expense added.'
        });
    }

    removeExpense = id => {
        this.setState({
            expenses: this.state.expenses.filter(expense => expense.id !== id)
        }, this.syncStateToLocal);
    }

    emitError = error => {
        let id = new Date().getTime();

        this.emitNotif({type: 'error', content: error});
    }

    emitNotif = notif => {
        let id = new Date().getTime();
        notif.id = id;

        this.setState({
            notifs: [...this.state.notifs, notif]
        });

        this.dispatchNotifRemoval(id);
    }

    removeNotif = id => {
        this.setState({
            notifs: this.state.notifs.filter(notif => notif.id !== id)
        })
    }

    dispatchNotifRemoval = id => {
        setTimeout(() => {
            this.removeNotif(id);
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

                <div id="app-notifs">
                    {this.state.notifs.map(notif => {
                        return (
                            <Notification
                                key={notif.id}
                                notif={notif}
                                removeNotif={this.removeNotif} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

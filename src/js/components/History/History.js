import React, {Component} from 'react';
import './History.css';

import Expenses from '../Expenses/Expenses';

class History extends Component {
    render() {
        return (
            <div id="history-container">
                <div id="history">
                    <div className="p-20 pb-0">
                        <h2>History</h2>
                    </div>
                    <Expenses
                        expenses={this.props.expenses}
                        removeExpense={this.props.removeExpense} />
                </div>
            </div>
        )
    }
}

export default History;

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Expense from '../Expense/Expense';

class Expenses extends Component {
    render() {
        return (
            this.props.expenses.map(expense => {
                return <Expense
                    key={expense.id}
                    expense={expense} />
            })
        )
    }
}

Expenses.propTypes = {
    expenses: PropTypes.array.isRequired
}

export default Expenses;

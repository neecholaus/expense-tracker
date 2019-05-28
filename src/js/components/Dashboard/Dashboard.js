import React, {Component} from 'react';
import './Dashboard.css';

const Chart = require('chartz');

class Dashboard extends Component {
    renderChart() {
        const {expenses} = this.props;
        let items = [];
        let map = {};

        expenses.forEach(item => {
            if(map[item.category]) map[item.category] += (item.amount / 100);
            else map[item.category] = item.amount / 100;
        });

        for(let category in map) {
            items.push({x:category,height:map[category]});
        }

        let column = {maxWidth: 150}
        
        if(Object.keys(map).length > 0) new Chart('chart', {column,items});
    }
    
    componentDidMount() {
        this.renderChart();
    }

    render() {
        const {expenses} = this.props;

        return (
            <div id="dashboard-container">
                <h2>Dashboard</h2>
                {expenses.length > 0
                    ? <div id="chart"></div>
                    : <p id="chart-replacement">No expenses</p>
                }
            </div>
        );
    }
}

export default Dashboard;
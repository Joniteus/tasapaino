import React from 'react';
import CumulativeBalance from './CumulativeBalance';
import YearList from './YearList';
import api from '../api/api';
//import testData from '../exampleData/transactions.json';

class App extends React.Component {

  state = { transactions: [],
            cumulativeBalance: 0,
            monthlyBalancesByYear: {},
            status: "init" };

  fetchTransactions = async () => {

    try {
      this.setState({status: "loading" });
      const response = await api
      .get('/api/v1/transactions');
      this.parseData(response.data);
      this.setState({status: "hit"});
    } catch (err) {
      this.setState({status: "error", transactions: [] });
    }
  }

  parseData = (data) => {
    const yearsMap = new Map();
    let balance = 0;

    data.forEach( transaction => {
      balance = balance + parseInt(transaction.amount);

      const transactionDate = new Date(Date.parse(transaction.date));
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();

      if (yearsMap.has(transactionYear)) {
        const monthsMap = yearsMap.get(transactionYear);
        if (monthsMap.has(transactionMonth)) {
          const newAmount = monthsMap.get(transactionMonth) + parseInt(transaction.amount);
          monthsMap.set(transactionMonth, newAmount);
          yearsMap.set(transactionYear, monthsMap)
        } else {
          monthsMap.set(transactionMonth, parseInt(transaction.amount));
          yearsMap.set(transactionYear, monthsMap);
        }
      } else {
        const month = new Map();
        month.set(transactionMonth, parseInt(transaction.amount));
        yearsMap.set(transactionYear, month);
      }
    });

    this.setState({monthlyBalancesByYear: yearsMap});
    this.setState({cumulativeBalance: balance});
  }

  componentDidMount = () => {
    this.fetchTransactions();
    
    //this.parseData(testData);
    //this.setState({status: "hit"});
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px'}}>
        <h1>Company Oy Ab Ltd</h1>
        <CumulativeBalance balance={this.state.cumulativeBalance} />
        <br />
        <YearList monthlyBalancesByYear={this.state.monthlyBalancesByYear} status={this.state.status} />
      </div>
    );
  }
}

export default App;

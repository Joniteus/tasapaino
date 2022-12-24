import React from 'react';
import './MonthlyBalanceList.css'

const months = [
  [0, 'Jan'],
  [1, 'Feb'],
  [2, 'Mar'],
  [3, 'Apr'],
  [4, 'May'],
  [5, 'Jun'],
  [6, 'Jul'],
  [7, 'Aug'],
  [8, 'Sep'],
  [9, 'Oct'],
  [10, 'Nov'],
  [11, 'Dec'],
];

const MonthlyBalanceList = (props) => {

  const test = months.map( month => {
    const currentBalance = props.months.get(month[0]);
    const balance = currentBalance ? currentBalance : 0;
    return (
      <div key={month[0]} className="column hour-item ui grid">
        <div className={`month-name`}>{ month[1] }</div>
        <div>{ balance > -1 ? '+' : '' }{ balance }</div>
      </div>
    );
  });

  return <div className={`content balance-list ui stackable grid ${props.active}`}>{test}</div>;
};


export default MonthlyBalanceList;

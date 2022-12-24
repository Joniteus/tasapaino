import React from 'react';
import './YearList.css';
import YearCard from './YearCard';

const YearList = (props) => {
  
  if (props.status === "hit" && props.monthlyBalancesByYear) {

    let days = Array.from(props.monthlyBalancesByYear.keys()).sort().reverse().map( year => {
      return <YearCard key={year} year={year} months={props.monthlyBalancesByYear.get(year)}/>
    });
    

    return <div className="year-list">{days}</div>;
  } else if (props.status === "init") {
    return <div className="year-list"></div>;
  } else if (props.status === "error") {
    return <div className="year-list">No data</div>;
  }
  return <div className="year-list">Loading data...</div>;
};

export default YearList;

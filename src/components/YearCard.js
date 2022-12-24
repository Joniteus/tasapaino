import React from 'react';
import MonthlyBalanceList from './MonthlyBalanceList';

class YearCard extends React.Component {
  state = { year: 0, active: '', months: null};

  constructor(props) {
    super(props);

    this.state.months = props.months;
  }

  onYearClick = (event) => {
    this.setState({ active: this.state.active === 'active' ? '' : 'active'});
  }

  render() {
    return (
      <div className="year-card ui styled accordion" key={this.props.day}
           onClick={this.onYearClick}>
        <div className={`title ${this.state.active}`}>{this.props.year}</div>
        <MonthlyBalanceList active={this.state.active} months={this.state.months}/>
      </div>
    );
  }
}

export default YearCard;
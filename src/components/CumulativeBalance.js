
import React from 'react';

const CumulativeBalance = (props) => {
  if (props.balance) {
    return (
      <div>
        <div>Your balance today is: { props.balance > 0 ? '+' : '' }{ props.balance }</div>
      </div>
    );
  }

  return <div></div>
}

export default CumulativeBalance;
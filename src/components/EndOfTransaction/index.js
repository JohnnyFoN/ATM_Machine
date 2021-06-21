import { React, useState } from 'react';
import './EndOfTransaction.scss';

export default ({ bills }) => {
  const [showBills, setShowBills] = useState(false);

  const setBillsDisplay = () => {
    setShowBills(true);
  };

  const renderMoney = (bills) => bills.map((bill) => {
    console.log('one bill', typeof bill);
    console.log('bills', typeof bills);
    return (
      <div className="bill" key={bills[bill]}>
        {bill}
      </div>
    );
  });

  return (
    <div>
      <h3>Thank you for being with us.</h3>
      <button className="endScreenButton" type="submit" onClick={setBillsDisplay}>Take your money </button>
      {showBills ? (
        <div className="moneyOutput">
          {renderMoney(bills)}
        </div>
      ) : null}
    </div>
  );
};

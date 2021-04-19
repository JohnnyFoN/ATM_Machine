import { React, useState } from 'react';
import './EndOfTransaction.scss';

export default ({ bills }) => {
  const [showBills, setShowBills] = useState(false);

  const setBillsDisplay = () => {
    setShowBills(true);
  };

  const renderMoney = (bills) => bills.map((bill) => (
    <div key={bills[bill]} className="bill">
      {bill}
    </div>
  ));

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

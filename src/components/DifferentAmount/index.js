import { React, useState } from 'react';
import './DifferentAmount.scss';

export default ({ withdrawMoneyFromCard }) => {
  const getWithdrawMoneyFromCardCallback = (amount) => () => withdrawMoneyFromCard(amount);
  const [amount, setAmount] = useState(0);

  const readAmount = (e) => {
    const { target: { value } } = e;
    setAmount(value);
  };

  return (
    <div>
      <h3>Insert your amount:</h3>
      <input className="amountInputField" type="text" placeholder="Amount" onChange={readAmount} />
      <button className="submitAmount" onClick={amount ? getWithdrawMoneyFromCardCallback(amount) : null} type="submit">Confirm</button>
    </div>
  );
};

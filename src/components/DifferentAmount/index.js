import { React } from 'react';
import './DifferentAmount.scss';

export default () => (
  <div>
    <h3>Insert your amount:</h3>
    <input className="amountInputField" type="text" placeholder="Amount" />
    <button className="submitAmount" type="submit">Confirm</button>
  </div>
);

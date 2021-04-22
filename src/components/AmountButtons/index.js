import { React } from 'react';
import './AmountButtons.scss';

export default ({ withdrawMoneyFromCard, showDifferentAmountInput }) => {
  const leftButtonApoens = [500, 1000, 2000, 5000];
  const rightButtonApoens = [10000, 20000, 24500];
  const getWithdrawMoneyFromCardCallback = (amount) => () => withdrawMoneyFromCard(amount);
  const getShowDifferentAmountInput = () => showDifferentAmountInput();

  const renderButtons = (apoens) => apoens.map((apoen) => (
    <button className="amountOptionButton" type="submit" key={apoens[apoen]} onClick={getWithdrawMoneyFromCardCallback(apoen)}>{apoen}</button>
  ));

  return (
    <div className="allButtons">
      <div className="leftButtons">
        {renderButtons(leftButtonApoens)}
      </div>
      <div className="rightButtons">
        {renderButtons(rightButtonApoens)}
        <button className="differentAmountOptionButton" type="submit" onClick={getShowDifferentAmountInput}>Different amount</button>
      </div>
    </div>
  );
};

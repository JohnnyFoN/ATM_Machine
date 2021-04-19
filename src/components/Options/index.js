import { React } from 'react';
import './Options.scss';

export default ({ chosenCard, showAccountAmountInfo, showWithdrawalOptions }) => {
  const getShowAccountAmountInfo = () => showAccountAmountInfo(`Available: ${chosenCard.cardAmount}`);
  const getShowWithdrawalOptions = () => showWithdrawalOptions();

  return (
    <div>
      <button className="optionButton" type="submit" onClick={getShowAccountAmountInfo}>Avalable assests</button>
      <button className="optionButton" type="submit" onClick={getShowWithdrawalOptions}>Withdraw assets</button>
    </div>
  );
};

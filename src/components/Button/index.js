import { React } from 'react';
import './Button.scss';

export default ({
  buttonText, verifyCard, cardNumber, cardPin,
}) => {
  const getVerifyCard = () => verifyCard(cardNumber, cardPin);

  return (
    <button type="submit" className="verifyCardButton" onClick={getVerifyCard}>
      {buttonText}
    </button>
  );
};

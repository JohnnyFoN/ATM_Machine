import { React, useState } from 'react';
import InputField from '../InputField';
import Button from '../Button';
import './Header.scss';

export default ({ verifyCard }) => {
  const [cardNumber, setCardNumber] = useState(0);
  const [cardPin, setCardPin] = useState(0);

  const setCardNo = (e) => {
    const { target: { value } } = e;
    setCardNumber(value);
  };

  const setPin = (e) => {
    const { target: { value } } = e;
    setCardPin(value);
  };

  return (
    <div className="cardVerificationContainer">
      <InputField title="Card No:" placeholderText="Insert card number" setCardNo={setCardNo} />
      <InputField title="Card PIN:" placeholderText="Insert PIN code" setPin={setPin} />
      <Button buttonText="Verify card" verifyCard={verifyCard} cardNumber={cardNumber} cardPin={cardPin} />
    </div>
  );
};

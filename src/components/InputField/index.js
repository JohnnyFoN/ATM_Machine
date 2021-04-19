import { React } from 'react';
import './InputField.scss';

export default ({ placeholderText, setCardNo, setPin }) => {
  const getSetCardNoAndSetPin = () => (placeholderText === 'Insert card number' ? setCardNo : setPin);

  return (
    <div className="inputFieldAndTitle">
      <input type="text" placeholder={placeholderText} onChange={getSetCardNoAndSetPin(placeholderText)} />
    </div>
  );
};

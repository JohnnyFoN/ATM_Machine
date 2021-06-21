import { React, useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { getBillsIfPossible, checkATMAssets } from './atm';
import './App.css';
import Header from './components/Header/index';
import Options from './components/Options';
import AmountButtons from './components/AmountButtons';
import EndOfTransaction from './components/EndOfTransaction';
import DifferentAmount from './components/DifferentAmount';

function App() {
  const [chosenCard, setChosenCard] = useState({ number: 0, PIN: 0, cardAmount: 0 });
  const [apoens, setApoens] = useState({
    5000: 4,
    2000: 4,
    1000: 4,
    500: 4,
  });
  const amountOfMoneyInTheATM = Object.keys(apoens).reduce((acc, current) => acc + apoens[current] * current, 0);
  const [displayMessage, setDisplayMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const [showEndOfTransaction, setShowEndOfTransaction] = useState(false);
  const [showCardNumberAndPin, setShowCardNumberAndPin] = useState(true);
  const [showDifferentAmount, setShowDifferentAmount] = useState(false);
  const [amountBills, setAmountBills] = useState([]);

  // EXISTING CARDS
  const cards = [{ number: 4587, PIN: 5879, cardAmount: 58000 },
    { number: 1485, PIN: 9857, cardAmount: 95690 },
    { number: 9687, PIN: 5569, cardAmount: 214752 },
    { number: 1, PIN: 1, cardAmount: 32000 }];

  const verifyCard = (cardNumber, PINCode) => {
    const card = cards.find((c) => c.number === Number(cardNumber) && c.PIN === Number(PINCode));
    if (!card) {
      setDisplayMessage('Invalid card number or PIN code.');
    } else {
      setDisplayMessage('Choose option');
      setShowOptions(true);
      setShowCardNumberAndPin(false);
      setChosenCard(card);
    }
  };

  const showAccountAmountInfo = (message) => {
    setDisplayMessage(message);
  };

  const showDifferentAmountInput = () => {
    setShowDifferentAmount(true);
    setShowAmounts(false);
    setDisplayMessage('');
  };

  const showWithdrawalOptions = () => {
    setDisplayMessage('Choose amount');
    setShowAmounts(true);
    setShowOptions(false);
  };

  const updateApoens = (billsForAmount) => {
    const keysArr = Object.keys(apoens).reverse();
    const newApoens = {};
    keysArr.forEach((key) => {
      newApoens[key] = apoens[key] - billsForAmount.filter((x) => (x === String(key))).length;
    });
    setApoens({ ...apoens, ...newApoens });
  };

  const withdrawMoneyFromCard = (amount) => {
    const { cardAmount } = chosenCard;
    if (amount >= cardAmount) {
      setDisplayMessage(`Not enough assets on your account. Disposable: ${cardAmount}`);
      return;
    }
    const hasEnoughMoneyInATM = checkATMAssets(amount);
    if (!hasEnoughMoneyInATM) {
      setDisplayMessage(`Not enough money in the ATM. Disposable: ${amountOfMoneyInTheATM}`);
      return;
    }
    setDisplayMessage('');
    const billsForAmount = getBillsIfPossible(amount);
    if (!billsForAmount.length) {
      setDisplayMessage('This amount is not available because of apoens.');
      return;
    }
    updateApoens(billsForAmount);
    // Router
    setShowAmounts(false);
    setShowDifferentAmount(false);
    setShowEndOfTransaction(true);
    setAmountBills(amountBills.concat(billsForAmount));
  };

  return (
    <div className="App">
      <p className="welcomeTitle">ATM MACHINE</p>

      {showCardNumberAndPin ? (<Header verifyCard={verifyCard} />) : null}

      <div className="infoMessage"><h3>{displayMessage}</h3></div>

      {showOptions ? (<Options chosenCard={chosenCard} showWithdrawalOptions={showWithdrawalOptions} showAccountAmountInfo={showAccountAmountInfo} />) : null}

      {showAmounts ? (<AmountButtons withdrawMoneyFromCard={withdrawMoneyFromCard} showDifferentAmountInput={showDifferentAmountInput} />) : null}

      {showEndOfTransaction ? (<EndOfTransaction bills={amountBills} />) : null}

      {showDifferentAmount ? (<DifferentAmount withdrawMoneyFromCard={withdrawMoneyFromCard} />) : null}
    </div>
  );
}

export default App;
// react router - mauntovanje komponenti u zavisnosti od navigacije
// redux da komponente imaju pristup store-u

// on save - linter

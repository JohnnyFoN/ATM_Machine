import { React, useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/index';
import Options from './components/Options';
import AmountButtons from './components/AmountButtons';
import EndOfTransaction from './components/EndOfTransaction';
import DifferentAmount from './components/DifferentAmount';

// BILLS 500 1000 2000 5000
const fiveHundredes = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500];
const oneThousands = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
const twoThousands = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000];
const fiveThousands = [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000];

function App() {
  const [chosenCard, setChosenCard] = useState({ number: 0, PIN: 0, cardAmount: 0 });
  const [displayMessage, setDisplayMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const [showEndOfTransaction, setShowEndOfTransaction] = useState(false);
  const [showCardNumberAndPin, setShowCardNumberAndPin] = useState(true);
  const [showDifferentAmount, setShowDifferentAmount] = useState(false);
  const [amountOfMoneyInTheATM, setAmountOfMoneyInTheATM] = useState(24500);
  const [amountBills, setAmountBills] = useState([]);

  // EXISTING CARDS
  const cards = [{ number: 4587, PIN: 5879, cardAmount: 58000 },
    { number: 1485, PIN: 9857, cardAmount: 95690 },
    { number: 9687, PIN: 5569, cardAmount: 214752 },
    { number: 1, PIN: 1, cardAmount: 30000 }];

  // BILLS FOR USER
  const billsForUser = [];

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

  const checkBillsInATM = (amount, apoen, billArray) => {
    setDisplayMessage('');
    while (amount >= apoen && billArray.length > 0) {
      billArray.pop();
      billsForUser.push(apoen);
      chosenCard.cardAmount -= apoen;
      amount -= apoen;
    }
    if (amount !== 0) {
      switch (apoen) {
        case 5000:
          checkBillsInATM(amount, 2000, twoThousands);
          break;
        case 2000:
          checkBillsInATM(amount, 1000, oneThousands);
          break;
        case 1000:
          checkBillsInATM(amount, 500, oneThousands);
          fiveHundredes.pop();
          break;
        default:
          console.log('Done.'); // improve this
      }
    } else {
      console.log(`Take your ${billsForUser.reduce((a, b) => a + b)} in bills: ${billsForUser}`);
      setAmountBills([]);
    }
  };

  const checkATMAssets = (amount) => !(amountOfMoneyInTheATM - amount < 0);

  const withdrawMoneyFromCard = (amount) => {
    const checkMoneyInATM = checkATMAssets(amount);
    if (amount >= chosenCard.cardAmount) {
      setDisplayMessage(`Not enough assets on your account. Disposable: ${chosenCard.cardAmount}`);
      return;
    }
    if (!checkMoneyInATM) {
      setDisplayMessage(`Not enough money in the ATM. Disposable: ${amountOfMoneyInTheATM}`);
      return;
    }
    checkBillsInATM(amount, 5000, fiveThousands);
    setAmountOfMoneyInTheATM(amountOfMoneyInTheATM - amount);
    setShowAmounts(false);
    setShowDifferentAmount(false);
    setShowEndOfTransaction(true);
    setAmountBills(billsForUser);
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

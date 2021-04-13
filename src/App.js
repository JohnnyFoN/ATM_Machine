import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Options from './components/Options';
import AmountButtons from './components/AmountButtons';
import EndOfTransaction from './components/EndOfTransaction';

// BILLS 500 1000 2000 5000
let fiveHundredes = [500,500,500,500,500,500,500,500,500,500];                // 5000
let oneThousands = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000];       //10000
let twoThousands = [2000,2000,2000,2000,2000,2000,2000,2000,2000,2000];       //20000
let fiveThousands = [5000,5000,5000,5000,5000,5000,5000,5000,5000,5000];      //50000

function App() {
  const [chosenCard, setChosenCard] = useState({number: 0, PIN: 0, cardAmount: 0});
  const [displayMessage, setDisplayMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const [showEndOfTransaction, setShowEndOfTransaction] = useState(false);
  const [showCardNumberAndPin, setShowCardNumberAndPin] = useState(true);
  const [amountOfMoneyInTheATM, setAmountOfMoneyInTheATM] = useState(24500);
  let [amountBills, setAmountBills] = useState([])

  // EXISTING CARDS
  const cards = [
    {number: 4587, PIN: 5879, cardAmount: 58000},
    {number: 1485, PIN: 9857, cardAmount: 95690}, 
    {number: 9687, PIN: 5569, cardAmount: 214752},
    {number: 1, PIN: 1, cardAmount: 30000}
  ];
   
  // BILLS FOR USER
  let amountBillsArr = []

  const verifyCard = (cardNumber, PINCode) => {  
    const card = cards.find((item) => item.number === Number(cardNumber) && item.PIN === Number(PINCode));
    if(!card){
      setDisplayMessage('Invalid card number or PIN code.');
    }
    else{
      setDisplayMessage('Choose option');
      setShowOptions(true);
      setShowCardNumberAndPin(false);
      setChosenCard(card);
    }
  }

  const showAccountAmountInfo = (message) =>{
    setDisplayMessage(message)
  }

  const showWithdrawalOptions = () =>{
    setDisplayMessage('Choose amount');
    setShowAmounts(true);
    setShowOptions(false);
  }

  const checkBillsInATM = (amount, apoen, billArray) =>{
    setDisplayMessage('');
    while(amount >= apoen && billArray.length > 0){
      billArray.pop();
      amountBillsArr.push(apoen);
      chosenCard.cardAmount -= apoen;
      amount-=apoen;
    }
    if(amount !== 0){
      switch(apoen){
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
      }
      
    }
    else{
      console.log(`Take your ${amountBillsArr.reduce((a,b)=>a+b)} in bills: ${amountBillsArr}`);
      amountBills = []
    }
  }

  /*
  const check2000 = (amount) =>{
      while(amount >= 2000 && twoThousands.length > 0){
          twoThousands.pop();
          // setAmountOfMoneyInTheATM(amountOfMoneyInTheATM-=amount);
          amountBills.push(2000);
          amount-=2000;
      }
      if(amount !== 0){
          check1000(amount)
      }
      else{
          console.log(`Take your ${amountBills.reduce((a,b)=>a+b)} in bills: ${amountBills}`);
          amountBills = []
      }
  }
  
  const check1000 = (amount) =>{
      while(amount >= 1000 && oneThousands.length > 0){
          oneThousands.pop();
          // setAmountOfMoneyInTheATM(amountOfMoneyInTheATM-=amount);
          amountBills.push(1000);
          amount-=1000;
      }
      if(amount !== 0){
          check500(amount)
      }
      else{
          console.log(`Take your ${amountBills.reduce((a,b)=>a+b)} in bills: ${amountBills}`);
          amountBills = []
      }
  }
  
  const check500 = (amount) =>{
      while(amount >= 500 && fiveHundredes.length > 0){
          fiveHundredes.pop();
          // setAmountOfMoneyInTheATM(amountOfMoneyInTheATM-=amount);
          amountBills.push(500);
          amount-=500;
      }
      console.log(`Take your ${amountBills.reduce((a,b)=>a+b)} in bills: ${amountBills}`);
      amountBills = []
  }
  */

  const checkATMAssets = (amount) => !(amountOfMoneyInTheATM - amount < 0); //truti falsi

  const withdrawMoneyFromCard = (amount) =>{
    const checkMoneyInATM = checkATMAssets(amount);
    //TODO switch(true)
    if(amount >= chosenCard.cardAmount){
      setDisplayMessage(`Not enough assets on your account. Disposable: ${chosenCard.cardAmount}`);
      return;
    }
    if(!checkMoneyInATM){
      setDisplayMessage(`Not enough money in the ATM. Disposable: ${amountOfMoneyInTheATM}`);
      return;
    }
    checkBillsInATM(amount,5000,fiveThousands);              
    setAmountOfMoneyInTheATM(amountOfMoneyInTheATM - amount);
    setShowAmounts(false);
    setShowEndOfTransaction(true);
    setAmountBills(amountBillsArr)
    console.log('Card amount', chosenCard.cardAmount);
    console.log('5000 bills', fiveThousands.length);
    console.log('2000 bills', twoThousands.length);
    console.log('500 bills', fiveHundredes.length);
    console.log('atm money: ',amountBills)
  }

  return (
    <div className="App">
      <p className="welcomeTitle">ATM MACHINE</p>

      {showCardNumberAndPin ? (<Header verifyCard={verifyCard}/>):null}

      <div className='infoMessage'><h3>{displayMessage}</h3></div>
      
      {showOptions ? (<Options chosenCard={chosenCard} showWithdrawalOptions={showWithdrawalOptions} showAccountAmountInfo={showAccountAmountInfo}/>):null}

      {showAmounts ? (<AmountButtons withdrawMoneyFromCard={withdrawMoneyFromCard}/>):null}

      {showEndOfTransaction ? (<EndOfTransaction bills={amountBills}/>):null}
    </div> 
  );
}

export default App;
//react router - mauntovanje komponenti u zavisnosti od navigacije
//redux da komponente imaju pristup store-u
//let u const
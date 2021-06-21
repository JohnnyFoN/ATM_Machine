const apoens = { // const as initial state and import to App.js
  // 2000: 2,
  // 5000: 1,
  // 500: 100,
  // 1000: 1,
  5000: 4,
  2000: 4,
  1000: 4,
  500: 4,
};

const amountOfMoneyInTheATM = Object.keys(apoens).reduce((acc, current) => acc + apoens[current] * current, 0);
const keysArr = Object.keys(apoens).sort((a, b) => b - a);

export const getHighestApoen = (apoensCopy, amount) => {
  const apoensForFullAmountPayment = keysArr.find((key) => (amount - (apoensCopy[key] * key) === 0));
  const highestApoen = keysArr.find((el) => Math.floor(amount / el) > 0 && apoensCopy[el] > 0);
  return apoensForFullAmountPayment || highestApoen;
};

export const getBillsIfPossible = (amount, billsArrSoFar = [], apoensForThisIteration = apoens) => {
  const smallestApoen = Math.min(...Object.keys(apoens));
  if (amount % smallestApoen !== 0) return [];
  const chosenApoen = getHighestApoen(apoensForThisIteration, amount);
  if (!chosenApoen) return [];
  const chosenApoenNumber = Math.floor(amount / chosenApoen);
  const availableApoenNumber = apoensForThisIteration[chosenApoen];
  const numberOfBillsOfChosenApoen = Math.min(chosenApoenNumber, availableApoenNumber);
  for (let i = 0; i < numberOfBillsOfChosenApoen; i++) {
    billsArrSoFar.push(chosenApoen);
  }
  amount -= (chosenApoen * numberOfBillsOfChosenApoen);
  const apoensForNextIteration = {
    ...apoensForThisIteration,
    [chosenApoen]: apoensForThisIteration[chosenApoen] - numberOfBillsOfChosenApoen,
  };
  return (amount !== 0) ? [...getBillsIfPossible(amount, billsArrSoFar, apoensForNextIteration)] : billsArrSoFar;
};

export const checkATMAssets = (amount) => (amountOfMoneyInTheATM - amount >= 0);

// TODO
// Rename file to utils

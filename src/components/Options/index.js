import './Options.scss'

export default ({chosenCard, showAccountAmountInfo, showWithdrawalOptions}) =>{
    const getShowAccountAmountInfo = () =>showAccountAmountInfo(`Available: ${chosenCard.cardAmount}`);
    const getShowWithdrawalOptions = () =>showWithdrawalOptions();
    
    return(
        <div>
            <button onClick={getShowAccountAmountInfo}>Avalable assests</button>
            <button onClick={getShowWithdrawalOptions}>Withdraw assets</button>
        </div>
    )
}

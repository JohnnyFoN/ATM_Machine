import './AmountButtons.scss'

export default ({withdrawMoneyFromCard}) =>{
    const getWithdrawMoneyFromCardCallback = (amount) => {
        return ()=>withdrawMoneyFromCard(amount);
    }

    const leftButtonApoens = [500,1000,2000,5000]
    const rightButtonApoens = [10000, 20000, 30000]

    const renderButtons = (apoens) => {
        return apoens.map((apoen, index) => (
            <button key={index} onClick={getWithdrawMoneyFromCardCallback(apoen)}>{apoen}</button>
        ) )
    }
    return(
        <div className='allButtons'>
            <div className='leftButtons'>
               {renderButtons(leftButtonApoens)}
            </div>
            <div className='rightButtons'>
               {renderButtons(rightButtonApoens)}
                <button>Different amount</button>
            </div>
      </div>
    )
}

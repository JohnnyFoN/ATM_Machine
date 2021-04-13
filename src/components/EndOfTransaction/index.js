import { useState } from 'react'
import './EndOfTransaction.scss'

export default ({bills}) =>{
    
    const [showBills, setShowBills] = useState(false);

    const setBillsDisplay =()=>{
        setShowBills(true);
    }

    const renderMoney = (bills) =>{
        return bills.map((bill,index) => (
            <div key={index} className='bill'>{bill}</div>
        ))
    }

    return(
        <div>
            <h1>Thank you for being with us.</h1>
            <button onClick={setBillsDisplay}>Take your money</button>
            {showBills ? (<div className='moneyOutput'>{renderMoney(bills)}</div>):null}
        </div>
    )
}
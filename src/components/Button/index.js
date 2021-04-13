import './Button.scss'

export default ({buttonText, verifyCard, cardNumber, cardPin}) =>{
    const getVerifyCard = () => verifyCard(cardNumber, cardPin);

    return(
        <button className='verifyCardButton' onClick={getVerifyCard}>{buttonText}</button>
    )
}

import './InputField.scss'

export default ({placeholderText, setCardNo, setPin}) =>{
    const getSetCardNoAndSetPin = (placeholderText) => (placeholderText === 'Insert card number' ? setCardNo:setPin);
    
    return(
        <div className='inputFieldAndTitle'>
            <input type='text' placeholder={placeholderText} onChange={getSetCardNoAndSetPin(placeholderText)}></input>
        </div>
    )
}

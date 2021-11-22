import React, { useEffect, useState } from 'react';

const PollItem = (props) => {

    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [radioButton, setRadioButton] = useState([false, false, false]);
    const [header, setHeader] = useState("");

    const handleRadioButtonClick = (index) => {
        let copyRadioButtons = [false, false, false];
        copyRadioButtons[index] = true;
        setRadioButton(copyRadioButtons)
        // console.log(value)
        setValue(index);
    }

    useEffect(()=>{
        setOptions(props.options)
        setHeader(props.header);
    },[props])

    return(
        <div>
            <h1>{header}</h1>
            {options.map((option, index)=> (
                <div key={index}>
                    <label>{option.option} - {option.votes}</label>
                    <input type="radio" onClick={()=> handleRadioButtonClick(index)} checked={radioButton[index]} />
               </div>
            ))}
            <button onClick={() => props.onSubmit(props.id, value)}>Submit</button>
        </div>
    )
}

export default PollItem;
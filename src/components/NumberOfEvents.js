import { useState } from "react";


const NumberOfEvents = ({setCurrentNOE, setErrorAlert}) => {
    const [eventNumber, setEventNumber] = useState('32');
    const handleInputChange = (event) => {
        const value = event.target.value;
        setEventNumber(value);
        setCurrentNOE(value);

        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = "Only positive numbers are allowed"
            setErrorAlert(infoText);
        } else {
            infoText = "";
            setErrorAlert(infoText);
            setCurrentNOE(value);
        } 
    };

    return (
        <div id="numberOfEvents">
            <input
              type="text"
              value={eventNumber}
              onChange={handleInputChange}
              data-testid="numberOfEventsInput"
            />
        </div>
    )
}

export default NumberOfEvents;
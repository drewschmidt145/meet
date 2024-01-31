import { useState } from "react";


const NumberOfEvents = ({setCurrentNOE}) => {
    const [eventNumber, setEventNumber] = useState('32');
    const handleInputChange = (event) => {
        const value = event.target.value;
        setEventNumber(value);
        setCurrentNOE(value);
    }
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
import { queryAllByRole, render } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';


describe('<CitySearch /> component', () => {
    let CitySearchComponent;

    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]}/>);
    })

  test('suggestion list is hidden default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });  
  test('renders a suggestionList when city box is clicked', async() => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestion');
  })
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('updates suggestionList correctly when user types in textbox', async() => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(<CitySearch allLocations={allLocations}/>);
    // User types 'Berlin' in textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    //extract suggestionList according to textbox value
    const suggestions = allLocations ? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    // Get suggestionList returned from CitySearch component
    const suggestionList = CitySearchComponent.queryAllByRole('listitem');

    // Compare extracted suggestionList with the result from CitySearch Component 
    expect(suggestionList).toHaveLength(suggestions.length + 1);
    for ( let i = 0; i < suggestions.length; i ++ ){
        expect(suggestionList[i].textContent).toBe(suggestions[i]);
    }

  });

  test('renders suggestion text in the textbox after clicking suggestion', async() => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }}/>);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // suggestion content for location will be 'Berlin, Germany'
    const Berlinsuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(Berlinsuggestion);

    expect(cityTextBox).toHaveValue(Berlinsuggestion.textContent);


  });

});
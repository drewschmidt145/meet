import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('Viewing All Upcoming Events', ({ given, when, then }) => {
        given('The user has not initiated a search for a specific city in the Calendar App', () => {

        });
        let AppComponent;
        when('The user navigates to the events section or main calendar view', () => {
            AppComponent = render(<App />);
        });
        then('The app should display all upcoming events from all cities by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('Searching for a City', ({ given, when, then }) => {
        let AppComponent;
        given('The user is in the Calendar App and wants to filter events by a specific city', () => {
            AppComponent = render(<App />);
        });
        let CitySearchDOM;
        when('The user starts typing the name of a city in the search bar', async () => {
            const user = userEvent.setup()
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(CitySearchInput, "Berlin");
        });

        then('The app should provide a list of suggested cities dynamically based on the user\'s input. The list should update in real-time as the user continues typing', () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM; 
        let CitySearchDOM;
        let citySearchInput;
        given('user was typing “Berlin” in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
            await user.type(citySearchInput, "Berlin");
        });

        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
            expect(suggestionListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();
            // filtering the list of all events down to events located in Germany
            // citySearchInput.value should have the value "Berlin, Germany" at this point
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});

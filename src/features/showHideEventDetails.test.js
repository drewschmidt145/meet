import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('Viewing Collapsed Events', ({ given, when, then }) => {
    let AppComponent;
    given('The user is in the Calendar App and has a series of events listed', () => {
        AppComponent = render(<App />);
    });

    when('The user navigates to a section where events are grouped or listed in a collapsed format', async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM  = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
        });
    });

    then('The app should display the series of events in a collapsed view, showing essential details for each event, such as the event name, date, and time', () => {

      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('Viewing Event Details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given('The user is logged into the Calendar App and has events scheduled', async () => {
        allEvents = await getEvents();
        EventComponent= render(<Event event={allEvents[0]} />);
        expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    when('The user clicks on a specific event on the calendar', async () => {
        const showDetails = EventComponent.queryByText('Show Details');
        const user = userEvent.setup();
        await user.click(showDetails);
    });

    then('The event details should be displayed, showing information such as event name, date, time, location, and any additional notes', () => {
        expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
        expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    });
  });
  
  test('User can collapse an event to hide its details', ({given, when, then,}) => {
    let AppComponent;
    let button;
    given('the user sees the details of an event', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });

      button = AppComponent.queryAllByText('Show Details')[0];
      await userEvent.click(button);

      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    when("the user presses a button to hide event's details", async () => {
      await userEvent.click(button);
    });

    then('the details of that even will be hidden', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });
});
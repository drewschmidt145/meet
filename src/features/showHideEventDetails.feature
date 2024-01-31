Feature: Show Hide Event Details
    Scenario: Viewing Collapsed Events
        Given The user is in the Calendar App and has a series of events listed
        When The user navigates to a section where events are grouped or listed in a collapsed format
        Then The app should display the series of events in a collapsed view, showing essential details for each event, such as the event name, date, and time

    Scenario: Viewing Event Details
        Given The user is logged into the Calendar App and has events scheduled
        When The user clicks on a specific event on the calendar
        Then The event details should be displayed, showing information such as event name, date, time, location, and any additional notes

    Scenario: User can collapse an event to hide its details
        Given the user sees the details of an event
        When the user presses a button to hide event's details
        Then the details of that even will be hidden

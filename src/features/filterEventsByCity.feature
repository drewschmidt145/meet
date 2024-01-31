Feature: Filter Events by City
    Scenario: Viewing All Upcoming Events
        Given The user has not initiated a search for a specific city in the Calendar App
        When The user navigates to the events section or main calendar view
        Then The app should display all upcoming events from all cities by default

    Scenario: Searching for a City
        Given The user is in the Calendar App and wants to filter events by a specific city
        When The user starts typing the name of a city in the search bar
        Then The app should provide a list of suggested cities dynamically based on the user's input. The list should update in real-time as the user continues typing

    Scenario: User can select a city from the suggested list.
        Given user was typing “Berlin” in the city textbox
        And the list of suggested cities is showing
        When the user selects a city (e.g., “Berlin, Germany”) from the list
        Then their city should be changed to that city (i.e., “Berlin, Germany”)
        And the user should receive a list of upcoming events in that city
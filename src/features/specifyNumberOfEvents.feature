Feature: Specify number of events
    Scenario: When user hasn't specified a number, 32 is the default number
        Given the user hasn't specified or filtered the number of events
        When the user sees the list of events
        Then the default number of displayed events will be 32
    Scenario: User can change the number of events they want to see.
        Given the user has events displayed
        When the user chooses to change the number of events displayed
        Then the number of events displayed will update to the number the user selected
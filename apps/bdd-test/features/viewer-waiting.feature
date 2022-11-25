@publisher
Feature: Viewer Waiting Room
    As a viewer
    I should be in waiting room when the streaming is not started

    Scenario: Viewer should be presented with Waiting Room when the streaming is not started
        Given a viewer is on the Waiting Room page
        Then on the viewer Waiting Room page streaming state dot should be hidden
        And on the publisher Preview page multi source label should be hidden
        And on the viewer Waiting Room page company name value should be "Company name"
        And on the viewer Waiting Room page stream time value should be "00:00:00"
        And on the viewer Waiting Room page heading value should be "Stream is not live"
        And on the viewer Waiting Room page description value should be "Please wait for livestream to begin."

        # And on the viewer Waiting Room page go live button should be hidden
        And on the viewer Waiting Room page add source button should be hidden
        And on the viewer Waiting Room page setting button should be hidden
        # And on the viewer Waiting Room page invite button should be hidden
        And on the viewer Waiting Room page stream info button should be hidden
        And on the publisher Preview page viewer count should be hidden


        And on the viewer Waiting Room page video view should be hidden
        And on the viewer Waiting Room page screen view should be hidden


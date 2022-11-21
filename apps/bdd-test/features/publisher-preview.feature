@publisher
Feature: Publisher Preview - Not Live
    As a publisher
    I want to setup the stream configuration on Preview page
    So that I can stream with required configuration

    # Figma Reference: https://www.figma.com/file/mpGO2yc1EBeDKgcvhmm5CA/Dolby.io-%2F-Real-time-Streaming-%E2%80%93-MVP?node-id=5825%3A19195
    # Precondition: Publisher should provide required microphone and camera permissions 
    # Test Execution: All the automated tests would be running on fake input devices (camera and microphone)

    Scenario: Publisher should be presented with different streaming control buttons to set configuration
        Given a publisher is on the Preview page
        #And on the publisher Preview page go live button should be enabled
        #And on the publisher Preview page go live button text should be "GO LIVE"
        Then on the publisher Preview page microphone button should be enabled
        And on the publisher Preview page camera button should be visible
        And on the publisher Preview page share button should be enabled
        #And on the publisher Preview page add source button should be enabled
        #And on the publisher Preview page add source button text should be "ADD SOURCE"
        And on the publisher Preview page setting button should be enabled
        And on the publisher Preview page invite button should be enabled
        #And on the publisher Preview page strean info button should be enabled


    Scenario: Publisher should be presented with streaming information
        Given a publisher is on the Preview page
        Then on the publisher Preview page streaming state value should be "live"
        And on the publisher Preview page company name value should be "Company name"
        And on the publisher Preview page stream time value should be "00:00:00"
        And on the publisher Preview page heading value should be "Get started"
        And on the publisher Preview page description value should be "Setup your audio and video before going live."

    Scenario: Publisher should be presented with main video view
        Given a publisher is on the Preview page
        Then on the publisher Preview page main view should be visible
        #And on the publisher Preview page inside main view live dot colour value should be "red"
        #And on the publisher Preview page inside main view source info label value should be "HD Camera"

    Scenario: Publisher should be able to turn off and on the camera
        Given a publisher is on the Preview page
        Then on the publisher Preview page camera should be turned On
        When the publisher turns Off the camera on the Preview page
        Then on the publisher Preview page camera should be turned Off
        When the publisher turns On the camera on the Preview page
        Then on the publisher Preview page camera should be turned On

    Scenario: Publisher should be able to turn off and on the microphone
        Given a publisher is on the Preview page
        Then on the publisher Preview page microphone should be turned On
        When the publisher turns Off the microphone on the Preview page
        Then on the publisher Preview page microphone should be turned Off
        When the publisher turns On the microphone on the Preview page
        Then on the publisher Preview page microphone should be turned On

    Scenario: Publisher should be able to do full screen of the main view
        Given a publisher is on the Preview page
        When the publisher clicks on full screen button of the main view on the Preview page
        Then on the publisher Preview page main view size should be full size
        And on the publisher Preview page main view should be visible
        And on the publisher Preview page full screen button should be visible
        # And on the publisher Preview page microphone button should be hidden
        # And on the publisher Preview page camera button should be hidden
        # And on the publisher Preview page share button should be hidden
        # And on the publisher Preview page setting button should be hidden
        #And on the publisher Preview page invite button should be hidden
        # And on the publisher Preview page start button should be hidden
        # And on the publisher Preview page gallery view should be hidden
        # And on the publisher Preview page streaming state should be hidden
        # And on the publisher Preview page company name should be hidden
        # And on the publisher Preview page stream time should be hidden
        # And on the publisher Preview page heading should be hidden
        # And on the publisher Preview page description should be hidden

    Scenario: Publisher should be able to go back to normal screen from full screen of the main stream view
        Given a publisher is on the Preview page
        When the publisher clicks on full screen button of the main view on the Preview page
        And the publisher clicks on normal screen button of the main view on the Preview page
        Then on the publisher Preview page main view size should be normal size
        And on the publisher Preview page microphone button should be visible
        And on the publisher Preview page camera button should be visible
        And on the publisher Preview page share button should be visible
        And on the publisher Preview page setting button should be visible
        And on the publisher Preview page invite button should be visible
        And on the publisher Preview page start button should be visible
        #And on the publisher Preview page gallery view should be hidden
        And on the publisher Preview page streaming state value should be "live"
        And on the publisher Preview page company name value should be "Company name"
        And on the publisher Preview page stream time value should be "00:00"
        And on the publisher Preview page heading value should be "Get started"

#     Scenario: Publisher should be able to copy the viewer link before going live for the broadcast
#         Given a publisher is on the Preview page
#         When the publisher copy the viewer link on the Preview page
#         When the publisher clicks on the invite viewers button on the Preview page

#         Then on the publisher Preview page message "Link copied!" should be displayed for invite button
#         And on the publisher Preview page viewer link button text should be "https://viewer.millicast.com/?streamId=TfW4pv/l9vzdpo6"
#         And on the publisher Preview page invite viewers text should be visible


#     Scenario: Publisher should be able to see the tooltip for different controls
#         Given a publisher is on the Preview page
#         When the publisher hovers the mouse over microphone button on the Preview page
#         Then on the publisher Preview page tooltip "Toggle microphone" should be displayed for microphone button
#         When the publisher hovers the mouse over camera button on the Preview page
#         Then on the publisher Preview page camera button tooltip should be "Toggle camera"
#         When the publisher hovers the mouse over share button on the Preview page
#         When the publisher hovers the mouse over setting button on the Preview page
#         When the publisher hovers the mouse over invite button on the Preview page

#         Then on the publisher Preview page message "Link copied!" should be displayed

    @only
    Scenario: Publisher should be able to do screen sharing on Preview page
        Given a publisher is on the Preview page
        When the publisher Starts screen sharing on the Preview page
        And the publisher Stops screen sharing on the Preview page
        And the publisher Starts screen sharing on the Preview page
        And the publisher Stops screen sharing on the Preview page
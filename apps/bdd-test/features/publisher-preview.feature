@publisher
Feature: Publisher Preview - Not Live
    As a publisher
    I want to setup the stream configuration on Preview page
    So that I can stream with required configuration

    # Figma Reference: https://www.figma.com/file/mpGO2yc1EBeDKgcvhmm5CA/Dolby.io-%2F-Real-time-Streaming-%E2%80%93-MVP?node-id=5825%3A19195
    # Precondition: Publisher should provide required microphone and camera permissions 
    # Test Execution: All the automated tests would be running on fake input devices (camera and microphone)


    # Add validations for visible

    Scenario: Publisher should be presented with different streaming control buttons to set configuration
        Given a publisher is on the Preview page
        And on the publisher Preview page go live button should be enabled
        And on the publisher Preview page go live button text should be "GO LIVE"
        Then on the publisher Preview page video view microphone button should be enabled
        And on the publisher Preview page video view camera button should be visible
        And on the publisher Preview page add source button should be enabled
        And on the publisher Preview page add source button text should be "Add source"
        And on the publisher Preview page setting button should be enabled
        And on the publisher Preview page invite button should be enabled
        And on the publisher Preview page stream info button should be hidden

    Scenario: Publisher should be presented with streaming information
        Given a publisher is on the Preview page
        Then on the publisher Preview page streaming state dot should be hidden
        And on the publisher Preview page company name value should be "Company name"
        And on the publisher Preview page stream time value should be "00:00:00"
        And on the publisher Preview page heading value should be "Get started"
        And on the publisher Preview page description value should be "Setup your audio and video before going live."

    Scenario: Publisher should be presented with main video view
        Given a publisher is on the Preview page
        Then on the publisher Preview page video view should be visible
        And on the publisher Preview page inside video view source name label value should be "fake_device_0"
        And on the publisher Preview page inside video view full screen button should be hidden

    Scenario: Publisher should be not presented with share screen view by default
        Given a publisher is on the Preview page
        Then on the publisher Preview page screen view should be hidden

    Scenario: Publisher should be able to turn off and on the camera
        Given a publisher is on the Preview page
        Then on the publisher Preview page video view camera should be turned On
        When the publisher turns Off the video view camera on the Preview page
        Then on the publisher Preview page video view camera should be turned Off
        When the publisher turns On the video view camera on the Preview page
        Then on the publisher Preview page video view camera should be turned On

    Scenario: Publisher should be able to turn off and on the microphone
        Given a publisher is on the Preview page
        Then on the publisher Preview page video view microphone should be turned On
        When the publisher turns Off the video view microphone on the Preview page
        Then on the publisher Preview page video view microphone should be turned Off
        When the publisher turns On the video view microphone on the Preview page
        Then on the publisher Preview page video view microphone should be turned On

    Scenario: Publisher should be able to turn off and on the camera and microphone
        Given a publisher is on the Preview page
        Then on the publisher Preview page video view camera should be turned On
        And on the publisher Preview page video view microphone should be turned On
        When the publisher turns Off the video view camera on the Preview page
        And the publisher turns Off the video view microphone on the Preview page
        Then on the publisher Preview page video view camera should be turned Off
        And on the publisher Preview page video view microphone should be turned Off
        When the publisher turns On the video view camera on the Preview page
        And the publisher turns On the video view microphone on the Preview page
        Then on the publisher Preview page video view camera should be turned On
        And on the publisher Preview page video view microphone should be turned On

    Scenario: Publisher should be presented with Share screen option under Add Sources
        Given a publisher is on the Preview page
        When the publisher clicks on the add source button on the Preview page
        Then on the publisher Preview page share screen button should be visible
        And on the publisher Preview page share screen button should be enabled
        And on the publisher Preview page add source should contain "Share screen" options

    Scenario: Publisher should be able to share screen before starting the stream
        Given a publisher is on the Preview page
        When the publisher clicks on the add source button on the Preview page
        And the publisher clicks on the share screen button on the Preview page
        Then on the publisher Preview page screen view should be visible
        # Add validations for video view
        And on the publisher Preview page inside screen view source name label value should be "screen"
        And on the publisher Preview page inside screen view full screen button should be hidden
        And on the publisher Preview page inside screen view stop screen share button should be visible
        And on the publisher Preview page inside screen view stop screen share button should be enabled
        And on the publisher Preview page add source button should be hidden
        And on the publisher Preview page multi source lbl should be visible
        And on the publisher Preview page multi source lbl value should be "Multisource enabled"

    Scenario: Publisher should be able to stop share screen before starting the stream
        Given a publisher is on the Preview page
        When the publisher clicks on the add source button on the Preview page
        And the publisher clicks on the share screen button on the Preview page
        Then on the publisher Preview page screen view should be visible

        When the publisher clicks on the stop screen share button on the Preview page
        # Add validations for video view
        Then on the publisher Preview page screen view should be hidden
        And on the publisher Preview page add source button should be visible
        And on the publisher Preview page add source button should be enabled
        And on the publisher Preview page multi source lbl should be hidden

   Scenario: Publisher should be presented with Setting controls
        Given a publisher is on the Preview page
        When the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        Then on the publisher Preview page settings drawer title value should be "Settings"
        Then on the publisher Preview page settings drawer dropdown count should be "4"

    Scenario: Publisher should be presented with camera selection dropdown under settings
        Given a publisher is on the Preview page
        And the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        And on the publisher Preview page camera dropdown should be visible
        And on the publisher Preview page camera dropdown should be enabled
        And on the publisher Preview page camera dropdown should contain "fake_device_0" options

    Scenario: Publisher should be presented with microphone selection dropdown under settings
        Given a publisher is on the Preview page
        And the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        And on the publisher Preview page microphone dropdown should be visible
        And on the publisher Preview page microphone dropdown should be enabled
        And on the publisher Preview page microphone dropdown should contain "Fake Audio Input 1,Fake Audio Input 2" options

    Scenario: Publisher should be presented with resolution selection dropdown under settings
        Given a publisher is on the Preview page
        And the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        And on the publisher Preview page resolution dropdown should be visible
        And on the publisher Preview page resolution dropdown should be enabled
        And on the publisher Preview page resolution dropdown should contain "3840x2160,2560x1440,1920x1080,1280x720,854x480,640x480,640x360" options

    Scenario: Publisher should be presented with codec selection dropdown under settings
        Given a publisher is on the Preview page
        And the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        And on the publisher Preview page codec dropdown should be visible
        And on the publisher Preview page codec dropdown should be enabled
        And on the publisher Preview page codec dropdown should contain "h264,vp8" options

    Scenario: Simulcast should be enabled by default with codec as h264
        Given a publisher is on the Preview page
        And the publisher clicks on the setting button on the Preview page
        Then on the publisher Preview page settings drawer should be visible
        And on the publisher Preview page simulcast input switch should be visible
        And on the publisher Preview page simulcast input switch should be enabled
        And on the publisher Preview page simulcast input switch should be checked 
        And on the publisher Preview page codec dropdown selected value should be "h264"


    # SC: Every DropDown: Visible/Enable/Options
    # Simulat enabled by default wih h264
    # SC: When simulcast enable, vp9 should be removed, disable vp9 should be shown

    # Scenario: Publisher should be able to do full screen of the main view
    #     Given a publisher is on the Preview page
    #     When the publisher clicks on full screen button of the main view on the Preview page
    #     Then on the publisher Preview page main view size should be full size
    #     And on the publisher Preview page main view should be visible
    #     And on the publisher Preview page full screen button should be visible
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

    # Scenario: Publisher should be able to go back to normal screen from full screen of the main stream view
    #     Given a publisher is on the Preview page
    #     When the publisher clicks on full screen button of the main view on the Preview page
    #     And the publisher clicks on normal screen button of the main view on the Preview page
    #     Then on the publisher Preview page main view size should be normal size
    #     And on the publisher Preview page microphone button should be visible
    #     And on the publisher Preview page camera button should be visible
    #     And on the publisher Preview page share button should be visible
    #     And on the publisher Preview page setting button should be visible
    #     And on the publisher Preview page invite button should be visible
    #     And on the publisher Preview page start button should be visible
    #     #And on the publisher Preview page gallery view should be hidden
    #     And on the publisher Preview page streaming state value should be "live"
    #     And on the publisher Preview page company name value should be "Company name"
    #     And on the publisher Preview page stream time value should be "00:00"
    #     And on the publisher Preview page heading value should be "Get started"

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

    # @only
    # Scenario: Publisher should be able to do screen sharing on Preview page
    #     Given a publisher is on the Preview page
    #     When the publisher Starts screen sharing on the Preview page
    #     And the publisher Stops screen sharing on the Preview page
    #     And the publisher Starts screen sharing on the Preview page
    #     And the publisher Stops screen sharing on the Preview page

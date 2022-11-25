@publisher
Feature: Publisher Streams
    As a publisher
    I want to do live streaming for an event

    @only
    Scenario: Publisher should be presented with different streaming control buttons when stream is live
        Given a publisher is on the Preview page
        When the publisher clicks on the go live button on the Preview page

        Then the publisher should be navigated to Stream page
        And on the publisher Stream page stop button should be visible
        And on the publisher Stream page stop button should be enabled
        And on the publisher Stream page stop button text should be "STOP"

        And on the publisher Stream page add source button should be visible
        And on the publisher Stream page add source button should be enabled
        And on the publisher Stream page add source button text should be "Add Source"

        And on the publisher Stream page setting button should be visible
        And on the publisher Stream page setting button should be enabled
        #And on the publisher Stream page invite button should be visible
        #And on the publisher Stream page invite button should be enabled
        And on the publisher Stream page stream info button should be visible
        And on the publisher Stream page stream info button should be enabled       
        And on the publisher Stream page video view should be visible        
        And on the publisher Stream page screen view should be hidden

        When the publisher clicks on the stop button on the Stream page
        Then the publisher should be navigated to Preview page
        
    @only
    Scenario: Publisher should be presented with with streaming information when stream is live
        Given a publisher is on the Preview page
        When the publisher clicks on the go live button on the Preview page

        Then the publisher should be navigated to Stream page
        And on the publisher Preview page company name value should be "Company name"
        #And on the publisher Stream page stream time value should be greater than "00:00:00"
        And on the publisher Stream page viewer count should be visible
        And on the publisher Stream page viewer count value should be "0 Viewers"

        And on the publisher Stream page streaming state dot should be visible
        And on the publisher Stream page multi source label should be hidden
        And on the publisher Stream page heading should be hidden
        And on the publisher Stream page description should be hidden


    @only
    Scenario: Publisher should be presented with main video view when stream is live
        Given a publisher is on the Preview page
        When the publisher clicks on the go live button on the Preview page

        Then the publisher should be navigated to Stream page
        And on the publisher Stream page video view should be visible
        And on the publisher Stream page video view microphone button should be visible
        And on the publisher Stream page video view microphone button should be enabled
        And on the publisher Stream page video view camera button should be visible
        And on the publisher Stream page video view camera button should be enabled
        And on the publisher Stream page video view source name label value should be "fake_device_0"
        And on the publisher Stream page video view full screen button should be hidden
        
        And on the publisher Stream page screen view should be hidden

        When the publisher clicks on the stop button on the Stream page
        Then the publisher should be navigated to Preview page






        # And on the publisher Stream page add source button should be visible
        # And on the publisher Stream page add source button should be enabled
        # And on the publisher Stream page add source button text should be "Add Source"
        # And on the publisher Stream page setting button should be visible
        # And on the publisher Stream page setting button should be enabled
        # #And on the publisher Stream page invite button should be visible
        # #And on the publisher Stream page invite button should be enabled
        # And on the publisher Stream page stream info button should be visible

# Verify Timer/CompanyName/Streaming State/ButtonState/Status
# Verify Invite Button

# ---------- Microphone --------
#    Scenario: Publisher should be able to start streaming with muted microphone 
#    Verification Verify Microphone Muted
#    Verification Verify Camera On
#    Unmute Microphone
#    Verification Verify Microphone Unmuted
#    Verify Viewers State for Microphone

#    Scenario: Publisher should be able to mute microphone during streaming
#    Verification Verify Microphone UnMuted
#    Verification Verify Camera On
#    Mute Microphone
#    Verification Verify Microphone Mute
#    Verify Viewers State for Microphone

# ---------- Camera --------
#    Scenario: Publisher should be able to start streaming with camera off 
#    Verification Verify camera off 
#    Verification Verify microphone On
#    Camera On
#    Verification Verify Camera On
#    Verify Viewers State for camera

#    Scenario: Publisher should be able to switch off camera during streaming
#    Verification Verify camera On 
#    Verification Verify microphone On
#    Camera Off
#    Verification Verify Camera Off
#    Verify Viewers State for camera


# ---------- Microphone and Camera --------
#    Scenario: Publisher should be able to start streaming with microphone and camera off 
#    Verification Verify camera off and microphone off
#    Camera On and microphone on
#    Verification Verify Camera On and  microphone on
#    Verify Viewers State for camera and microphone

#    Scenario: Publisher should be able to switch off camera and microphone during streaming
#    Verification Verify camera and microphone On 
#    Camera and microphone Off
#    Verification Verify Camera and microphone Off
#    Verify Viewers State for camera and microphone

# ---------- Codec --------
#    Scenario: Publisher should be able to do streaming with VP8 and Simulcast Off
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option InVisible

#    Scenario: Publisher should be able to do streaming with VP9 and Simulcast Off
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option InVisible

#    Scenario: Publisher should be able to do streaming with H264 and Simulcast Off
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option InVisible

# ---------- Simulcast --------
#    Scenario: Publisher should be able to do streaming with VP8 and Simulcast On
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option Visible

#    Scenario: Publisher should be able to do streaming with H264 and Simulcast On
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option Visible
# ---- Default Streaming
#    Scenario: Publisher should be able to do streaming with Simulcast enabled with H264 default
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option Visible

#    Scenario: Publisher should be able to do streaming with VP8, Simulcast On and Desktop Sharing
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option Visible

#    Scenario: Publisher should be able to do streaming with H264 and Simulcast On and Desktop Sharing
#    Verification Stream Information [Publisher and Viewer]
#    Video Quality Option Visible


# ---------- Resolution --------

# ---------- Echo Cancellation ON --------

# ----- During Streaming Certain Configuration options should be enabled and other disabled/hidden

# ----- Streaming with Share Desktop
#    Scenario: Publisher should be able to do screen share and then go live
#       Verify On Stream Page, video and desktop views are shown
#       Verify the controls available on both views
#       Verify Viewers for video and desktop views

#    Scenario: Publisher should be able to go live and start the screen share
#       Verify On Stream Page, video and desktop views are shown
#       Verify the controls available on both views
#       Verify Viewers for video and desktop views

#    Scenario: Publisher should be able to go live and start the screen share with Simulcast Off
#       Verify On Stream Page, video and desktop views are shown
#       Verify the controls available on both views
#       Verify Viewers for video and desktop views

#    Scenario: Publisher should be able to stop screen share during streaming
#       Stop screen sharing
#       Verify Viewers for video and desktop views
#       Start screen sharing
#       Verify Viewers for video and desktop views


# ----- Stop Streaming

# -- SC: Multiple Viewers Count
# -- SC: Add Viewers and Verify Count
# -- SC: Remove Viewers and Verify Count


# --- Change Camera during streaming
# Change Microphone during streaming
# Change Resolution dueing streaming

# Verify Timer with mins verification i.e [00:01:12]

# Publisher stream with simul and again stream without simulcast
# Changed seetings are stored after stream is stopped


# Screen Share before start
# Screen Share after start
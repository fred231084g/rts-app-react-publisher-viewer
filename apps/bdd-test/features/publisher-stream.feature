@publisher
Feature: Publisher Stream
    As a publisher
    I want to do live streaming for an event


    Scenario: Publisher should be able to do streaming for an event
        Given a publisher is on the Preview page
        When the publisher starts streaming on the Preview page
        Then the publisher should be navigated to Stream page
        And on the publisher Stream page main view should be visible
        And on the publisher Stream page streaming state value should be "live"
        #And on the publisher Stream page stream time value should be greater than "00:00"
        And on the publisher Stream page participant count value should be "0"
        And on the publisher Stream page stop button should be enabled
        And on the publisher Stream page stop button text should be "STOP STREAMING"
        When the publisher stops streaming on the Stream page
        Then the publisher should be navigated to Preview page

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

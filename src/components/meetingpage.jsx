
import React, { useEffect } from 'react';
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  DeviceChangeObserver,
} from 'amazon-chime-sdk-js';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ChimeSDK from 'amazon-chime-sdk-js';
import DefaultAudioMixController from 'amazon-chime-sdk-js/build/audiomixcontroller/DefaultAudioMixController';
import { Link } from 'react-router-dom';
const MEETING_SERVICE = "https://hxaytg39m9.execute-api.us-east-1.amazonaws.com/bytes-meeting";
var isMeetingHost = false;
// var meetingId = "";
var attendeeId = "";
var userName = "";
var clientId = "";
var isScreenShared = false;

const attendees = new Set();

function refreshAttendeesDisplay()
{
	//Create list of attendees from attendees set, and then display.
	let attendeeStr = "";
	for (const item of attendees) {
		attendeeStr = attendeeStr + item + " | ";
	}
	attendeeStr = attendeeStr.slice(0, -3);

	document.getElementById("Attendees").innerText = attendeeStr;
}

let isMuted = false;
let isVideoOn = true;

function attendeeObserver(attendeeId, present, externalUserId, dropped, posInFrame) {

	//Get Attendee User Name from externalUserId where it was set while joining meeting
	var attendeeUserName = externalUserId.substring(0, externalUserId.indexOf("#"));

	// If attendee 'present' is true, add to attendees set.
	if (present) {
		attendees.add(attendeeUserName);
	}
	else {
		// Attendee no longer 'present', remove the attendee display div with video tile
		const elements = document.getElementsByName("div-" + attendeeId);
		elements[0].remove();

		// For screen share attendeeId comes with #content suffix.
		// Do not remove user from attendees if this is screen share closure update
		if (!(attendeeId.indexOf("#content") >= 0)) {
			attendees.delete(attendeeUserName);
		}
	}

	refreshAttendeesDisplay();
};

const MeetingPage = () => {
  const [meetingSession, setMeetingSession] = useState(null);
  const[meet,setmeet]=useState('')
  const[antendeeid,setattendeeid]=useState('')
  const[ended,setended]=useState(true)
  const navigate=useNavigate()

  const location = useLocation();
let session;
  const { username,requestpath,meetingId } = location.state;
  console.log(requestpath)
  console.log(username)
  console.log(meetingId)

  const logger = new ChimeSDK.ConsoleLogger(
    "ChimeMeetingLogs",
    ChimeSDK.LogLevel.INFO
  );
  
  const deviceController = new ChimeSDK.DefaultDeviceController(logger);
  clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


if (!meetingId) {
	isMeetingHost = true;
}

  useEffect(() => {
 
    const updateTiles = (meetingSession) => {
      const tiles = meetingSession.audioVideo.getAllVideoTiles();
      console.log(tiles)
      tiles.forEach(tile => {
        let tileId = tile.tileState.tileId;
        console.log(tileId)
        let divElement = document.getElementById("div-" + tileId);

        if (!divElement) {
          divElement = document.createElement("div");
          divElement.id = "div-" + tileId;
          divElement.setAttribute("name", "div-" + tile.tileState.boundAttendeeId);
          divElement.style.display = "inline-block";
          divElement.style.padding = "5px";

          const videoElement = document.createElement("video");
          videoElement.id = "video-" + tileId;
          videoElement.setAttribute("name", "video-" + tile.tileState.boundAttendeeId);
          videoElement.width = '500px'
          videoElement.height = "500px";
          videoElement.autoplay = true;
          videoElement.muted = false;

          const tileUserName = document.createElement("p");
          tileUserName.style.color = "blueviolet";
          const boundExtUserId = tile.tileState.boundExternalUserId;
          tileUserName.textContent = boundExtUserId.substring(0, boundExtUserId.indexOf("#"));

          let controlsContainer = document.createElement("div");
          controlsContainer.style.position = "absolute";
          controlsContainer.style.bottom = "10px";
          controlsContainer.style.right = "10px";
          controlsContainer.style.background = "rgba(0, 0, 0, 0.5)";
          controlsContainer.style.padding = "5px";
          controlsContainer.style.borderRadius = "5px";

          const muteButton = document.createElement("button");
          muteButton.id = "mute-button-" + tileId;
          muteButton.title = "Toggle Mute";
          muteButton.innerHTML = "&#128266;";
          muteButton.onclick = function() {
            if (isMuted) {
                meetingSession.audioVideo.realtimeUnmuteLocalAudio();
                document.getElementById("mute-button-" + tileId).innerHTML = "&#128266;";
            } else {
                meetingSession.audioVideo.realtimeMuteLocalAudio();
                document.getElementById("mute-button-" + tileId).innerHTML = "&#128263;";
            }
            isMuted = !isMuted;
        };

          const videoButton = document.createElement("button");
          videoButton.id = "video-button-" + tileId;
          videoButton.title = "Toggle Video";
          videoButton.innerHTML = "&#128247;";
          videoButton.onclick = function() {
            
          };

          const shareButton = document.createElement("button");
          shareButton.id = "share-button-" + tileId;
          shareButton.title = "Toggle Screen Share";
          shareButton.innerHTML = "&#128187;";
          shareButton.onclick =  share;

          const stopMeetingButton = document.createElement("button");
          stopMeetingButton.id = "stop-meeting-button-" + tileId;
          stopMeetingButton.title = "Stop Meeting";
          stopMeetingButton.innerHTML = "&#128250;";
          stopMeetingButton.onclick = stopMeeting;
          controlsContainer.appendChild(muteButton);
          controlsContainer.appendChild(videoButton);
          controlsContainer.appendChild(shareButton);
          controlsContainer.appendChild(stopMeetingButton);

          divElement.appendChild(tileUserName);
          divElement.appendChild(videoElement);
          divElement.appendChild(controlsContainer);

          document.getElementById("video-list").appendChild(divElement);
          meetingSession.audioVideo.bindVideoElement(tileId, videoElement);
        }
      });
    };

    let audioInputs, videoInputs;
    const startMeeting = async () => {
      try {
        // Send request to service (API Gateway > Lambda function) to start/join meeting.
        console.log(requestpath)
        const response = await fetch(requestpath, {
          method: "POST",
          headers: new Headers(),
          body: JSON.stringify({ action: "DO_MEETING", MEETING_ID: meetingId, USERNAME: username })
        });

        const data = await response.json();
        console.log(data)

        if (!data.hasOwnProperty('Info')) {
          alert("Oops! The meeting might have ended!");
          console.log("Meeting was not Found");
          return;
        }
        // meetingId=data.Info.Meeting.Meeting.MeetingId
        // console.log(meetingId)
        // console.log(data.Info.Meeting.MeetingId)
        // console.log(data.Info.Meeting.Meeting.MeetingId)
        setmeet(data.Info.Meeting.Meeting.MeetingId)
        setattendeeid(data.Info.Attendee.Attendee.AttendeeId)
        const configuration = new ChimeSDK.MeetingSessionConfiguration(
          data.Info.Meeting.Meeting,
          
          data.Info.Attendee.Attendee
        );

         session = new ChimeSDK.DefaultMeetingSession(
          configuration,
          logger,
          deviceController
        );

        setMeetingSession(session);

        console.log(meetingSession)

       

        // Initialize Audio Video
        const audioInputs = await session.audioVideo.listAudioInputDevices();
        const videoInputs = await session.audioVideo.listVideoInputDevices();
        console.log("Audio Inputs: ", audioInputs);
        console.log("Video Inputs: ", videoInputs);

        await session.audioVideo.startAudioInput(audioInputs[0].deviceId);
        await session.audioVideo.startVideoInput(videoInputs[0].deviceId);


        const observer = {
          // Tile State changed, so let's examine it.
          videoTileDidUpdate: (tileState) => {
            if (!tileState.boundAttendeeId) {
              return;
            }
            if (session) {
              console.log(session)
              console.log(meetingSession)
              updateTiles(session);
            }
          },
        };

        const eventObserver = {
          // Check for events of interest for eg. Meeting End.
          eventDidReceive(name, attributes) {
            switch (name) {
              case 'meetingEnded':
                console.log("NOTE: Meeting Ended", attributes);
                break;
              case 'meetingReconnected':
                console.log('NOTE: Meeting Reconnected...');
                break;
            }
          }
        };

        // Add observers for the meeting session
        session.audioVideo.addObserver(observer);
        session.audioVideo.realtimeSubscribeToAttendeeIdPresence(attendeeObserver);
        session.eventController.addObserver(eventObserver);

        const audioOutputElement = document.getElementById("meeting-audio");
        console.log(audioOutputElement)
        session.audioVideo.bindAudioElement(audioOutputElement);
        session.audioVideo.start();
        session.audioVideo.startLocalVideoTile();
      } catch (err) {
        console.error("Error: " + err);
      }
    };

    if ( isVideoOn) { // Only start a new meeting if meetingSession is null and meeting has not ended
      console.log(isVideoOn)
      startMeeting();
    }

  }, []); 
  async function exitMeeting() {
    //Send request to service(API Gateway > Lambda function) to delete Attendee Id from meeting.
    try {
      var response = await fetch(requestpath, {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify({ action: "DELETE_ATTENDEE", MEETING_ID: `${meetingId}`, ATTENDEE_ID: `${antendeeid}` })
      });
        
      const data = await response.json();
      isVideoOn=false
      console.log("NOTE: END MEETING RESPONSE " + JSON.stringify(data));
      //meetingSession.deviceController.destroy();
  
      cleanup();
    }
    catch (err) {
      console.error("Error: " + err);
    }
  }

// function cleanup(){
// 	meetingSession.deviceController.destroy();
// 	window.meetingSession = null;
// 	//if meeting host - don't preserve the meeting id.
//   navigate('/')

// 	// document.getElementById("video-list").replaceChildren();
// 	attendees.clear();
// 	// document.getElementById("meeting-link").innerText = "";
// 	refreshAttendeesDisplay();
// }
async function cleanup() {
  await meetingSession.deviceController.destroy();
  window.meetingSession = null;
  
  // if (isMeetingHost) {
  //   meetingId = null;
  // }

  attendees.clear();
  refreshAttendeesDisplay();
  setended(false)

  // navigate('/');
}


async function stopMeeting() {
  try {
      var response = await fetch(requestpath, {
          method: "POST",
          headers: new Headers(),
          body: JSON.stringify({ action: "END_MEETING", MEETING_ID: `${meetingId}` })
      });

      const data = await response.json();
      console.log("NOTE: END MEETING RESPONSE " + JSON.stringify(data));

      cleanup();
  } catch (err) {
      console.error("NOTE Error: " + err);
  }
}
function share() {
  try {
    console.log(meetingSession)
    console.log(window.meetingSession)
      if (session) {

          if (isScreenShared) {
              session.audioVideo.stopContentShare();
              // shareButton.innerText = "Start Screen Share";
              isScreenShared = false;
          } else {
              session.audioVideo.startContentShareFromScreenCapture();
              // shareButton.innerText = "Stop Screen Share";
              isScreenShared = true;
          }
      } else {
          alert("Please start or join a meeting first!");
      }
  } catch (err) {
      console.error("Error: " + err);
  }
}

  return (
   <>
{ended ? (
  <div>
  <div style={{ width: '100%', textAlign: 'center', margin: '80px auto' }}>
    <div style={{ width: '100%', textAlign: 'center', margin: '50px auto' }}>
      {isMeetingHost && <button type="button" id="stop-button" style={{marginRight: '1em'}} onClick={stopMeeting}>Stop Meeting</button>}
      {!isMeetingHost && <button type="button" id="exit-button" style={{marginRight: '1em'}} onClick={exitMeeting}>Exit Meeting</button>}
      <button type="button" id="share-button" style={{marginRight: '1em'}}>Screen Share</button>
    </div>
  </div>
  
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-8">
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          {console.log(meet)}
          <a href={`http://localhost:3000/?meetingId=${meet}`} target="_blank" rel="noopener noreferrer">Join Meeting</a>
        </div>
        <div id="meeting-audi" className="bg-dark p-3"></div>
      </div>
      <div className="col-md-4">
        <div className="p-3 mb-3 bg-light"></div>
        <div id="Attendees"></div>
      </div>
    </div>
  </div>

  <div id="video-list"></div>

  <audio id="meeting-audio"></audio>
</div>
) : (
  <div>
  <h1>Meeting Ended</h1>
  <div style={{ display: 'none' }}>
    <div id="video-list"></div>
  </div>
  <Link to="/">Click here to go back home</Link>
</div>
)}

  </>
  

  );
};



export default MeetingPage;




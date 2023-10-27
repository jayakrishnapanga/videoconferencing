import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
// const Homepage = () => {
//   const [meetingId, setMeetingId] = useState('');

//   const handleInputChange = (e) => {
//     setMeetingId(e.target.value);
//   }

//   const handleJoinButtonClick = () => {
//     axios.post('http://localhost:3001/api/join-meeting', { meetingId })
//       .then(response => {
//         console.log(response.data); // Handle the response from the backend
//       })
//       .catch(error => {
//         console.error('Error joining meeting:', error);
//       });
//   }

//   return (
//     <div>
//       <label htmlFor="meetingId">Meeting ID</label>
//       <input 
//         type="text" 
//         id="meetingId" 
//         value={meetingId} 
//         onChange={handleInputChange} 
//       />
//       <button onClick={handleJoinButtonClick}>Join</button>
//     </div>
//   )
// }


// import {
//   ConsoleLogger,
//   DefaultDeviceController,
//   DefaultMeetingSession,
//   LogLevel,
//   MeetingSessionConfiguration
// } from 'amazon-chime-sdk-js';

// const Homepage = () => {
//   const [meetingId, setMeetingId] = useState('');
//   const [meetingSession, setMeetingSession] = useState(null); // Add state for meeting session

//   const handleInputChange = (e) => {
//     setMeetingId(e.target.value);
//   }

//   const handleJoinButtonClick = async () => {
//     // Assuming you have axios configured
//     const response = await axios.post('http://localhost:3001/api/join-meeting', { meetingId });
//     const { meetingResponse, attendeeResponse } = response.data;

//     // Initialize Amazon Chime SDK
//     const logger = new ConsoleLogger('MyLogger', LogLevel.INFO);
//     const deviceController = new DefaultDeviceController(logger);

//     const configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);

//     const newMeetingSession = new DefaultMeetingSession(
//       configuration,
//       logger,
//       deviceController
//     );
// console.log(newMeetingSession)
//     setMeetingSession(newMeetingSession);
//   }

//   return (
//     <div>
//       <label htmlFor="meetingId">Meeting ID</label>
//       <input 
//         type="text" 
//         id="meetingId" 
//         value={meetingId} 
//         onChange={handleInputChange} 
//       />
//       <button onClick={handleJoinButtonClick}>Join</button>
//     </div>
//   )
// }

// const Homepage = () => {
//   const [meetingId, setMeetingId] = useState('');
//   const [meetingLink, setMeetingLink] = useState(''); // Add state for meeting link
//   const [meetingData, setMeetingData] = useState(null);
//   const [meetingResponse, setMeetingResponse] = useState(null);
//   const [attendeeResponse, setAttendeeResponse] = useState(null);
//   const navigate = useNavigate(); 
//   const location=useLocation()
//   const handleInputChange = (e) => {
//     setMeetingId(e.target.value);
//   }
//   const handleMeeting = () => {
//     navigate(`/meeting/${meetingId}`, {
//         state: {
//           meetingResponse,
//           attendeeResponse,
//           meetingLink
//         }
//       });
//   }

// const handleJoinButtonClick = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/join-meeting', { meetingId });
//       console.log(response.data); // Handle the response from the backend
//       setMeetingData(response.data);
//       localStorage.setItem('data',response.data)
//       setMeetingLink(response.data.meetingLink); // Set the meeting link in state

//       const { meetingResponse, attendeeResponse, meetingLink } = response.data;

//       setMeetingResponse(meetingResponse);
//       setAttendeeResponse(attendeeResponse);
//       setMeetingLink(meetingLink);

//     } catch (error) {
//       console.error('Error joining meeting:', error);
//     }
//   }
  
//   return (
//     <div>
//       <label htmlFor="meetingId">Meeting ID</label>
//       <input 
//         type="text" 
//         id="meetingId" 
//         value={meetingId} 
//         onChange={handleInputChange} 
//       />
//       <button onClick={handleJoinButtonClick}>Join</button>

//       {meetingLink && (
//         <div>
//           <p>Meeting Link: {meetingLink}</p>
//           <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//             Join Now
//           </a>
//           <button onClick={handleMeeting}>JoinNow</button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Homepage;

const MEETING_SERVICE = "https://hxaytg39m9.execute-api.us-east-1.amazonaws.com/bytes-meeting";
var clientId = "";
clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

let requestpath = MEETING_SERVICE + `?clientId=${clientId}`;
const Homepage = () => {
    const [username, setUsername] = useState(''); // Change state variable name to 'username'
    const [meetingLink, setMeetingLink] = useState('');
    const [meetingData, setMeetingData] = useState(null);
    const [meetingResponse, setMeetingResponse] = useState(null);
    const [attendeeResponse, setAttendeeResponse] = useState(null);
    const [isMeetingHost, setIsMeetingHost] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const id = urlParams.get('meetingId');
       console.log(id)
      if (id) {
        requestpath += `&meetingId=${id}`;
        console.log(requestpath)
        setMeetingId(id);
      } else {
        console.log(requestpath)
        setIsMeetingHost(true);
      }
    }, []);
  
    const handleInputChange = (e) => {
      setUsername(e.target.value); // Change state variable to 'username'
    }
  
    const handleMeeting = () => {
      navigate(`/meeting/${username}`, { // Change state variable to 'username'
        state: {
          
          username,
          requestpath,
          meetingId
        }
      });
    }
  
    const handleStartButtonClick = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/join-meeting', { username }); // Change input field to 'username'
        console.log(response.data);
        setMeetingData(response.data);
        localStorage.setItem('data', response.data);
        setMeetingLink(response.data.meetingLink);
  
        const { meetingResponse, attendeeResponse, meetingLink } = response.data;
        console.log(response.data)
        setMeetingResponse(meetingResponse);
        setAttendeeResponse(attendeeResponse);
        setMeetingLink(meetingLink);
  
      } catch (error) {
        console.error('Error joining meeting:', error);
      }
    }
    
    return (
      <div >
        <label htmlFor="username">Username</label> {/* Change label text to 'Username' */}
        <input 
          type="text" 
          id="username" // Change input field id to 'username'
          value={username} 
          onChange={handleInputChange} 
        />
        {/* <button className='start' onClick={handleJoinButtonClick}>StartMeet</button> */}
        <button onClick={handleMeeting}>
        {isMeetingHost ? 'Start Meeting' : 'Join Meeting'}
      </button>
        <div style={{ width: '100%', textAlign: 'center', margin: '20px auto' }}>
  <img src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg" alt="Image Description" style={{ width: '400px', height: 'auto' }} />
</div>
  
        {meetingLink && (
          <div>
            <p>Meeting Link: {meetingLink}</p>
            <a href={meetingLink} target="_blank" rel="noopener noreferrer">
              Join Now
            </a>
            <button onClick={handleMeeting}>Join Now</button>
          </div>
        )}
      </div>
    )
  }
export default Homepage  
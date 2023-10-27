import {
  VideoTileGrid,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import axios from 'axios';
const MyApp = () => {
  const meetingManager = useMeetingManager();

  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server application
    const response = await axios.post('http://localhost:3001/api/join-meeting', { username:'krishna' });
    const data = await response.data;

    // Initialize the `MeetingSessionConfiguration`
    const meetingSessionConfiguration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);

    // Use the join API to create a meeting session using the MeetingSessionConfiguration
    await meetingManager.join(
      meetingSessionConfiguration
    );

    await meetingManager.start();
  };

  return (
    <>
      <button onClick={joinMeeting}>Join</button>
      <VideoTileGrid />
    </>
  );
};

export default MyApp;

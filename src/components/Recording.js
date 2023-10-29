// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const RecordVideoComponent = () => {
//   const webcamRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);

//   const startRecording = () => {
//     const mediaRecorder = new MediaRecorder(webcamRef.current.stream);

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks([...recordedChunks, event.data]);
//       }
//     };

//     mediaRecorder.start();
//     setRecording(true);
//     setMediaRecorder(mediaRecorder);
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const downloadVideo = () => {
//     const blob = new Blob(recordedChunks, { type: 'video/webm' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     document.body.appendChild(a);
//     a.style = 'display: none';
//     a.href = url;
//     a.download = 'recorded-video.webm';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} />
//       {recording ? (
//         <button onClick={stopRecording}>Stop Recording</button>
//       ) : (
//         <button onClick={startRecording}>Start Recording</button>
//       )}
//       <button onClick={downloadVideo}>Download Video</button>
//     </div>
//   );
// };

// export default RecordVideoComponent;

// code-2
// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import RecordRTC from 'recordrtc';

// const RecordVideoComponent = () => {
//   const webcamRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedVideoUrl, setRecordedVideoUrl] = useState('');

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

//     const recorder = new RecordRTC(stream, {
//       type: 'video',
//       mimeType: 'video/webm',
//       disableLogs: true,
//     });

//     recorder.startRecording();

//     setRecording(true);
//     setMediaRecorder(recorder);
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stopRecording(() => {
//         mediaRecorder.getDataURL((dataURL) => {
//           setRecordedVideoUrl(dataURL); // Store the Data URL
//         });
//       });

//       setRecording(false);
//     }
//   };

//   const handleDownload = () => {
//     const a = document.createElement('a');
//     a.href = recordedVideoUrl;
//     a.download = 'recorded_video.webm';
//     a.click();
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!recording}>
//         Stop Recording
//       </button>

//       {recordedVideoUrl && (
//         <div>
//           <video src={recordedVideoUrl} controls />
//           <button onClick={handleDownload}>Download Video</button>
//         </div>
//       )}

//       <div>
//         <Webcam audio={false} ref={webcamRef} />
//       </div>
//     </div>
//   );
// };

// export default RecordVideoComponent;


// 3
import React, { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

// const RecordVideoComponent = () => {
//   const [recording, setRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedVideoUrl, setRecordedVideoUrl] = useState('');

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true ,audio: true});

//       const recorder = new RecordRTC(stream, {
//         type: 'video',
//         mimeType: 'video/webm',
//         disableLogs: true,
//       });

//       recorder.startRecording();

//       setRecording(true);
//       setMediaRecorder(recorder);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stopRecording(() => {
//         mediaRecorder.getDataURL((dataURL) => {
//           setRecordedVideoUrl(dataURL);
//         });
//       });

//       setRecording(false);
//     }
//   };

//   const handleDownload = () => {
//     const a = document.createElement('a');
//     a.href = recordedVideoUrl;
//     a.download = 'recorded_video.webm';
//     a.click();
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!recording}>
//         Stop Recording
//       </button>

//       {recordedVideoUrl && (
//         <div>
//           <video src={recordedVideoUrl} controls />
//           <button onClick={handleDownload}>Download Video</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecordVideoComponent;
import axios from 'axios';
const RecordVideoComponent = (props) => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
    const [saved, setSaved] = useState('');
    const [recordingStopped,setRecordingStopped]=useState(false)
    const { ismeetinghost } = props;
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  
        const recorder = new RecordRTC(stream, {
          type: 'video',
          mimeType: 'video/webm',
          disableLogs: true,
        });
  
        recorder.startRecording();
  
        setRecording(true);
        setMediaRecorder(recorder);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    };
    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stopRecording(() => {
          const blob = mediaRecorder.getBlob();
          setRecordedVideoBlob(blob);
          setRecording(false); // Set recording state to false when recording stops
        });
  
        // Show recording stopped indication
        setRecordingStopped(true);
        setTimeout(() => {
          setRecordingStopped(false);
        }, 1000);
      }
    };
  


  
    const handleSave = async () => {
        if (recordedVideoBlob) {
          setSaved('saving'); 
          try {
            const formData = new FormData();
            const userid=localStorage.getItem('usrid')
            formData.append('video', recordedVideoBlob, 'recorded_video.webm');
            formData.append('userId',userid)
            console.log(formData)
            console.log(userid)
            const response = await axios.post('https://videomeetbackend.vercel.app/user/upload', formData);
      
            if (response.status === 200) {
              console.log(response)
              // setSaved(true);
              setSaved('success');
            } else {
              console.error('Error saving video:', response.status);
            }
          } catch (error) {
            console.error('Error saving video:', error);
          }
        }
      };
    return (
      <div>
       
        <button
  onClick={startRecording}
  disabled={recording || saved}
  className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-700 mr-2"
>
  Start Recording
</button>

<button
  onClick={stopRecording}
  disabled={!recording || saved}
  className="px-4 py-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-700 mr-2"
>
  Stop Recording
</button>
{recording && <div className="text-green-500 mb-2">Recording...</div>}
      {recordingStopped && <div className="text-red-500 mb-2">Recording stopped.</div>}



  
        {recordedVideoBlob && (
          <>
          <div className='w-1/3'>
            <video src={URL.createObjectURL(recordedVideoBlob)} controls />
            {ismeetinghost &&(
              <>
                 <button onClick={handleSave} disabled={!recordedVideoBlob || saved}
                 className="px-4 py-2 bg-green-500 text-white rounded-full transition duration-300 hover:bg-green-700 mt-4">
                 Save
                </button>
                {saved === 'saving' && <div className='text-slate-50'>Saving your video, please wait...</div>}
                {saved === 'success' && <div className='text-slate-50'>Video saved successfully!</div>}
                </>
            )}
          </div>
          </>
        )}
  
        {/* {saved && <div>Video saved successfully!</div>} */}
      </div>
    );
  };
  
  export default RecordVideoComponent;
  
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';
// const RecordedVideos = () => {
//   const [videos, setVideos] = useState([]);
// //   const [userid,setuserid]=useState('')

//   const location = useLocation();

//     const { userid } = location.state;
      
//   useEffect(() => {
//     // setuserid(localStorage.getItem('usrid'))
//     const fetchVideos = async () => {
//         try {
//           console.log(userid);
//           const response = await axios.get(`http://localhost:3001/video/${userid}`);
//           const data = response.data;
      
//           if (response.status === 200) {
//             console.log(data)
//             setVideos(data);
//           } else {
//             console.error(data.message); // Handle error
//           }
//         } catch (error) {
//           console.error('Error fetching videos:', error);
//         }
//       }
//     fetchVideos();
//   }, []);

//   return (
//     <div>
//       <h2>Recorded Videos</h2>
//       <ul>
//         {videos.map(video => (
//           <li key={video._id}>
//             <video controls width="320" height="240">
//               <source src={`http://your-api-endpoint.com/video/${userid}`} type="video/webm" />
//             </video>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


const RecordedVideos = () => {
    const [videos, setVideos] = useState([]);
    const location = useLocation();
    const { userid } = location.state;
    const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await axios.get(`https://videomeetbackend.vercel.app/user/video/${userid}`);
          setLoading(false)
          if (response.status === 200 ) {
            // Set the response data as the video source
         
            console.log(response.data)
            setVideos(response.data);
          } else {
            console.error(response.statusText); // Handle error
          }
        } catch (error) {
         
            setLoading(false)

          console.error('Error fetching videos:', error);
        }
      };
  
      fetchVideos();
    }, [userid]);
    const goBack = () => {
    navigate('/user')
      };
  
//     return (
// //         // version1
// //     //   <div>
// //     //     <h2>Recorded Videos</h2>
// //     //     <ul>
// //     //       {Array.isArray(videos) && videos.length > 0 ? (
// //     //         videos.map((video, index) => (
// //     //           <li key={index}>
// //     //             <video controls width="320" height="240">
// //     //               <source src={`data:video/webm;base64,${video}`} type="video/webm" />
// //     //             </video>
// //     //           </li>
// //     //         ))
// //     //       ) : (
// //     //         <p>No recorded videos available</p>
// //     //       )}
// //     //     </ul>
// //     //   </div>
// //     // version2
// // //     <div>
// // //     <h2 className="text-2xl font-bold mb-4">Recorded Videos</h2>
// // //     <div className="flex flex-wrap -mx-4">
// // //       {Array.isArray(videos) && videos.length > 0 ? (
// // //         videos.map((video, index) => (
// // //           <div key={index} className="w-1/2 px-4 mb-4">
// // //             <div className="font-bold mb-2">{video.uploadDate}</div>
// // //             <video controls width="320" height="240" className="w-full">
// // //               <source src={`data:video/webm;base64,${video.data}`} type="video/webm" />
// // //             </video>
// // //           </div>
// // //         ))
// // //       ) : (
// // //         <p>No recorded videos available</p>
// // //       )}
// // //     </div>
// // //   </div>
// // // version3
// {/* <>
// {loading && <Loader />}

// {!loading &&(
//     <>
//     <div>
//     <button
//       onClick={goBack}
//       className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-700 mr-2 mt-2"
//     >
//       Go Back
//     </button>
//   </div>
// <div>
// <h2 className="text-2xl text-center font-bold mb-4">Recorded Videos</h2>

// {Array.isArray(videos) && videos.length > 0 ? (
//   <table className="table-fixed w-1/2 ml-20">
//     <thead>
//       <tr>
//         <th className="w-1/4 px-4 py-2">Uploaded Date</th>
//         <th className="w-3/4 px-4 py-2">Recorded Video</th>
//       </tr>
//     </thead>
//     <tbody>
//       {videos.map((video, index) => (
//         <tr key={index}>
//           <td className="border px-4 py-2">{new Date(video.uploadDate).toISOString().split('T')[0]}</td>
//           <td className="border px-4 py-2">
//             <video controls width="320" height="240" className="w-full">
//               <source src={`data:video/webm;base64,${video.data}`} type="video/webm" />
//             </video>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// ) : (
//   <p>No records found</p>
// )}
// </div>
// </>
// )}

// </> */}
// <>
//   {loading && <Loader />}

//   {!loading && (
//     <>
//       <div>
//         <button
//           onClick={goBack}
//           className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-700 mr-2 mt-2"
//         >
//           Go Back
//         </button>
//       </div>

//       <div>
//         <h2 className="text-2xl text-center font-bold mb-4">Recorded Videos</h2>

//         {Array.isArray(videos) && videos.length > 0 ? (
//           <table className="table-fixed w-1/2 ml-20">
//             <thead>
//               <tr>
//                 <th className="w-1/4 px-4 py-2">Uploaded Date</th>
//                 <th className="w-3/4 px-4 py-2">Recorded Video</th>
//               </tr>
//             </thead>
//             <tbody>
//               {videos.map(video => (
//                 <tr key={video.id}> {/* Assuming 'id' is a unique identifier */}
//                   <td className="border px-4 py-2">
//                     {new Date(video.uploadDate).toISOString().split('T')[0]}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <video controls width="320" height="240" className="w-full">
//                       <source src={`data:video/webm;base64,${video.data}`} type="video/webm" />
//                     </video>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center">No recorded videos found</p>
//         )}
//       </div>
//     </>
//   )}
// </>

//     )
return (
<>
  {loading && <Loader />}

  {!loading && videos && Array.isArray(videos) && videos.length > 0 && (
    <>
      <div>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-700 mr-2 mt-2"
        >
          Go Back
        </button>
      </div>

      <div>
        <h2 className="text-2xl text-center font-bold mb-4">Recorded Videos</h2>

        <table className="table-fixed w-1/2 ml-20">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Uploaded Date</th>
              <th className="w-3/4 px-4 py-2">Recorded Video</th>
            </tr>
          </thead>
          <tbody>
  {videos.map(video => (
    <tr key={video.id}>
      <td className="border px-4 py-2">
        {new Date(video.uploadDate).toISOString().split('T')[0]}
      </td>
      <td className="border px-4 py-2">
        <video controls width="320" height="240" className="w-full">
          <source src={`data:video/webm;base64,${video.data}`} type="video/webm" />
        </video>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  )}
  {!loading && (!videos || (Array.isArray(videos) && videos.length === 0)) && (
    
    <>
    <div className="text-center">No recorded videos found</div>
    <div className='content-center'>
    <button
      onClick={goBack}
      className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-700 mr-2 mt-2"
    >
      Go Back
    </button>
  </div>
    </>
  )}
</>


)

};
  
  export default RecordedVideos;







  //   return(
//     <div>
//   <h2 className="text-2xl font-bold mb-4">Recorded Videos</h2>
//   {Array.isArray(videos) && videos.length > 0 ? (
//     <table className="table-fixed">
//       <thead>
//         <tr>
//           <th className="w-1/4 px-4 py-2">Uploaded Date</th>
//           <th className="w-3/4 px-4 py-2">Recorded Video</th>
//           <th className="w-1/4 px-4 py-2">Actions</th> {/* Added Actions heading */}
//         </tr>
//       </thead>
//       <tbody>
//         {videos.map((video, index) => (
//           <tr key={index}>
//             <td className="border px-4 py-2">{video.uploadDate}</td>
//             <td className="border px-4 py-2">
//               <video controls width="320" height="240" className="w-full">
//                 <source src={`data:video/webm;base64,${video.data}`} type="video/webm" />
//               </video>
//             </td>
//             <td className="border px-4 py-2">
//               <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     <p>No recorded videos available</p>
//   )}
// </div>
//   )
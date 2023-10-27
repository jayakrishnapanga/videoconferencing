import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MeetingPage from './components/meetingpage';
import Homepage from './components/hoemapge';
import MyApp from './App';
import Root from './root';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
     <BrowserRouter>
     {/* Your other components and content can be included here */}
     <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/meeting/:meetingId" element={<MeetingPage/>} />
     
     </Routes>
   </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

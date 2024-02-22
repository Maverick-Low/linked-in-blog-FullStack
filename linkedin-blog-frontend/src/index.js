import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmeHF4OusIKfRO8oCXSslRoN6GSca3rZA",
  authDomain: "linkedin-blog-78a5d.firebaseapp.com",
  projectId: "linkedin-blog-78a5d",
  storageBucket: "linkedin-blog-78a5d.appspot.com",
  messagingSenderId: "423440081807",
  appId: "1:423440081807:web:5ae23911ee70bbc5dba1fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';

const config = { 
  
apiKey: "AIzaSyCoTCy8_3FB-qVnnqzulRde4oE2x0urgh4",
authDomain: "westasks-7a8bf.firebaseapp.com",
databaseURL: "https://westasks-7a8bf-default-rtdb.firebaseio.com",
projectId: "westasks-7a8bf",
storageBucket: "westasks-7a8bf.appspot.com",
messagingSenderId: "1007537549474",
appId: "1:1007537549474:web:4e27de4b8ec0ab911c67fb" 
  
}

firebase.initializeApp(config)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

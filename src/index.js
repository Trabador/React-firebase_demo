import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCrwX3X4R8BwHDl5KtvtAqTgz16nue-wk0",
    authDomain: "cosmos-shared.firebaseapp.com",
    databaseURL: "https://cosmos-shared.firebaseio.com",
    projectId: "cosmos-shared",
    storageBucket: "cosmos-shared.appspot.com",
    messagingSenderId: "494360404297"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

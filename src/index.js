import React from 'react';
import ReactDOM from 'react-dom';//I'm not sure what this one is doing. 
import './index.css';
import App from './App';
//These imports allow us to refer to other components in our react app and actually make use of them. 
//React.DOM?
// Here we are rendering our app component.  
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



//index.js is the entry point for the app.
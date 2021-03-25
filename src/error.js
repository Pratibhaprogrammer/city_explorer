import React from 'react';
//This component essentially renders the error functionality that was written in app.js
//grabbing that handleError function from app.js and rendering the results here

class Error extends React.Component{
  render(){
    return(
      <>
      <h2>User Error</h2>
      <p>{this.props.handleError.message}</p>  
      </>
    )
  }
}
export default Error;

//??Does props carry information from other components or just through classes?
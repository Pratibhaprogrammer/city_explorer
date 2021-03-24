import React from 'react';

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
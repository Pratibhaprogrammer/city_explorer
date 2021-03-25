import React from 'react';
import axios from 'axios';

class Forcast extends React.Component {//Here we created a Forcast class that extends react
  constructor(props){//We are passing props as a parameter
    super(props);
    this.state={//giving it state
      weatherForcast:[]
    }
  }
//here we have the async and await.  basically saying that it's going to take some time to retrieve this data so we need to stop running untill we get it(await)
//?? need clarification on componentDidMount
  componentDidMount = async() => {
    const SERVER = 'http://localhost:3001'; //declaring the vairable SERVER to our local host3001(our custom server)
    //here is where we are getting data from our custom server with the axios library
    const forcast = await axios.get(`${SERVER}/weather`);//assigning forcast to this method
    const forcastArray = forcast.data;//grabbing the usable data with forcast and assigning that to the variable forcastArray
    console.log({forcastArray});//checking out the array
    this.setState({ weatherForcast: forcastArray });//updating our state with this data we just pulled in
  }

  render() {
    return(
      <>
      <h2>Weather</h2>
      {this.state.weatherForcast.map((item, index) => (
        <div key={index}>
          {item}
        </div>
      ))}
      </>

    )
  }
}

export default Forcast;
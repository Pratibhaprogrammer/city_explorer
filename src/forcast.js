import React from 'react';
import superagent from 'superagent';

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
    console.log('str');
    const SERVER = 'http://localhost:3001'; //declaring the vairable SERVER to our local host3001(our custom server)
    //here is where we are getting data from our custom server with the superagent library
    const query = {latitude: this.props.location.lat, longitude: this.props.location.lon};
    // const forcast = await superagent.get(`${SERVER}/weather`).query(query);
    const forcast = await superagent.get(`${process.env.REACT_APP_SERVER}/weather`).query(query);//assigning forcast to this method
    console.log(forcast);//checking out the array
    const forcastArray = forcast.body;//grabbing the usable data with forcast and assigning that to the variable forcastArray
    this.setState({ weatherForcast: forcastArray });//updating our state with this data we just pulled in
  }

  render() {
    return(
      <>
      <h2>Weather</h2>
      {this.state.weatherForcast.map((item, index) => (
        <div key={index}>
          {item.date} {item.description}
        </div>
      ))}
      </>

    )
  }
}

export default Forcast;
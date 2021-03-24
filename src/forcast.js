import React from 'react';
import axios from 'axios';

class Forcast extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weatherForcast:[]
    }
  }

  componentDidMount = async() => {
    const SERVER = 'http://localhost:3001';
    const forcast = await axios.get(`${SERVER}/weather`);
    const forcastArray = forcast.data;
    console.log({forcastArray});
    this.setState({ weatherForcast: forcastArray });
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
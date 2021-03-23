import React from 'react';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      citySearch: '',
      findImg: '',
      displayResults: false
    }
    
  }
  LocationInfo = async(e) => {
    e.preventDefault();
    console.log(this.state.citySearch);
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MYKEY}&q=${this.state.citySearch}&format=json`;
    const location = await axios.get(url).catch(function(error){
      if(error.response){
        // console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }else if (error.request){
        console.log(error.request);
      }else{
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    const locationArray = location.data;
    
    
    this.setState({ 
      location: locationArray[0], 
      displayResults: true,
      findImg: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MYKEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13` 
    });
  }

  render() {
    console.log('state', this.state)
    return(
      <>
        <form onSubmit={this.LocationInfo} >
          <input onChange={(e) => this.setState({ citySearch: e.target.value })}  placeholder="city"/>
          <button type="submit">explore!</button>
        </form>
        <h1>Hello! Search a city</h1>

        {this.state.displayResults &&
          <>
            <h2>{this.state.location.display_name}</h2>
            <img src={this.state.findImg} alt={''} />
          </>
        }
      </>
    )
  }
}


export default App;

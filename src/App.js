import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forcast from './forcast.js';
import Error from './error.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      citySearch: '',
      findImg: '',
      displayResults: false,
      displayError: false,
      error: {}
    }

  }
  LocationInfo = async (e) => {
    e.preventDefault();
    console.log(this.state.citySearch);
    try{
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MYKEY}&q=${this.state.citySearch}&format=json`;
      const location = await axios.get(url);
      const locationArray = location.data;
      this.setState({
        location: locationArray[0],
        displayResults: true,
        findImg: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MYKEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
      });
    }catch(error){
      console.log(error);
      this.setState({displayError: true, error: error});
    }
    }

  render() {
    console.log('state', this.state)
    return (
      <>
        <form onSubmit={this.LocationInfo} >
          <input onChange={(e) => this.setState({ citySearch: e.target.value })} placeholder="city" />
          <button type="submit">explore!</button>
        </form>
        <h1>Hello! Search a city</h1>

        {this.state.displayResults &&
          <Card style={{ width: '18rem' }} bg='success'>
            
            <Card.Img src={this.state.findImg} alt={''} />
            <Card.Body>
              <Card.Title>{this.state.location.display_name}</Card.Title>
              <Card.Text>
                {this.state.location.lat}
              </Card.Text>
              <Card.Text>
                {this.state.location.lon}
              </Card.Text>
              <Forcast></Forcast>
            </Card.Body>
          </Card>
          
        }
        {this.state.displayError && 
          <>
            <Error handleError = {this.state.error}/>

            
          </>
        }
      </>
    )
  }
}


export default App;

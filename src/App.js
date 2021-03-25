import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forcast from './forcast.js';
import Error from './error.js';

//Here we are saying that App is a child of React.Component.  Does it inheret any properties from React.Component?
class App extends React.Component {
  //Passing props into our construcor function
  constructor(props) {
    //what is Super doing in this instance?
    super(props);//not really inhereting anything from index.js
    //this constructor has a state(I think of this like a condition that is being held by the constructor).  the state includes location, citySearch, findImg, displayResults(set to false), displayError(set to false), and error as an empty object
    this.state = {
      location: {},
      citySearch: '',
      findImg: '',
      displayResults: false,
      displayError: false,
      error: {}
    }

  }
  //async tells the code that what we are trying to produce will take time. await makes the code stop until we have what we need.  
  //axios is the library being used. its a very clean way for us to use http methods. it is the tool that goes to the website and packages the data up for us to use. 

  //await and async must be used inconjunctio or neither will work. but we are passing and event into this function as a parameter
  LocationInfo = async (e) => {
    //prevents the form from taking you to a new page when you submit. 
    e.preventDefault();
    console.log(this.state.citySearch);
    try {
      //Try/catch is like an if else statement.
      //key= my private api token, q= (query) we are using state.citySearch so that the user can search for more than one city.  The state changes
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MYKEY}&q=${this.state.citySearch}&format=json`;
      const location = await axios.get(url);//if we don't have this then line 37(location.data)will be undefined.
      const locationArray = location.data;//data is coming from axios.  we are leaveraging it with location. (kind of attatching)
      this.setState({
        location: locationArray[0],//we are giving location an object from an index of location array. (location array has many indecies)
        displayResults: true, //hey, go ahead and show that stuff
        //now that we have data back, we can give that data to the static map. (array[0])
        findImg: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MYKEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`
      });
    } catch (error) {//If the above doesn't work then we get this error
      console.log(error);//as a Dev I want to see all the information about the error
      this.setState({ displayError: true, error: error });//Here we are setting a more simple error message to state. 
    }
  }
  //Here is where we beggin to render the results of the LocationInfo function. 
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
            <Error handleError={this.state.error} />


          </>
        }
      </>
    )
  }
}


export default App;

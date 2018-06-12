import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import SearchBar from './Components/SearchBar/SearchBar';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';



const app = new Clarifai.App({
 apiKey: 'de2b2dbb31674f1091abb778888661c5'
});

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: 
        {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: new Date()
        }
  }

 const particlesOptions = {
        particles: {
                  number: { value: 50, density: { enable: true, value_area: 700 } },
                  line_linked: {
                      enable: true,
                      opacity: 1
                  },
                  opacity: {
                    value: 1
                  },
                } 
              }

class App extends Component {

  state = initialState;
  

  profileHandler = (data) => {
    this.setState({user:{
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
    })
  }


  searchHandler = (event) => {
      // console.log(event.target.value);
      this.setState({input: event.target.value});
  }


faceLocationHandler = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBoxHandler = (box) => {
    this.setState({box: box}); 
    
  }



  clickHandler = () => {
    // console.log("clicked");
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayBoxHandler(this.faceLocationHandler(response)))
    .catch(error => console.log(error))
  };


  routeChangeHandler = (route) => {
    if(route === 'signin'){
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render() {

    return (
      <div className="App">
        <Particles
          className = "Particles" 
          params = {particlesOptions}/>
        {
          this.state.route === 'home'
          ?<div>
            <Navigation signout = {this.routeChangeHandler}/>
            <SearchBar 
              search = {this.searchHandler}
              clicked = {this.clickHandler}
              name = {this.state.user.name}/>
            <FaceRecognition 
              box = {this.state.box} 
              imageUrl = {this.state.imageUrl}/>
          </div>
            :(
            this.state.route === 'signin'
            ?
            <Signin 
              signin = {this.routeChangeHandler}
              profileHandler = {this.profileHandler}/>
            :<Register 
                signin = {this.routeChangeHandler}
                profileHandler = {this.profileHandler} />
            )
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react' 
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer 
          google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyANyxgdbAbD-CMMlPI4uD1WitemgJoA_Ug'
})(App)

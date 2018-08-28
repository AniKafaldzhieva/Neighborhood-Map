import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react' 
import MapContainer from './MapContainer';
import ErrorBoundary from './ErrorBoundary'
import './App.css';

window.gm_authFailure = () => {
  alert("Something went wrong. Please, check your Google API key!")
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <ErrorBoundary>
        <MapContainer 
          google={this.props.google}
        />
      </ErrorBoundary>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyANyxgdbAbD-CMMlPI4uD1WitemgJoA_Ug'
})(App)

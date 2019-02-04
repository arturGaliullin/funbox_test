import React, { Component } from 'react';
import MapContainer from './containers/Map';
import PlacemarksEditor from './containers/PlacemarksEditor';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <PlacemarksEditor/>
        <MapContainer />
      </div>
    );
  }
}

export default App;

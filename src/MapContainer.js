import React, { Component } from 'react'
//import Marker from './Marker'
import InfoWindow from './InfoWindow'
//import Map from './Map'
import { Map, Marker } from 'google-maps-react'
import SearchMenu from './SearchMenu';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
        this.state = {
            locations: [
                {
                    title: 'Vasil Levski National Stadium',
                    location: {lat: 42.68754596957368, lng: 23.335282802581787},
                    visible: true
                },
                {
                    title: 'National Art Gallery',
                    location: {lat: 42.69627, lng: 23.327238},
                    visible: true
                },
                {
                    title: 'Arena Armeec',
                    location: {lat: 42.67134752981014, lng: 23.369313578811898},
                    visible: true
                },
                {
                    title: 'National Historical Museum',
                    location: {lat: 42.65509880014672, lng: 23.27085488999728},
                    visible: true
                },
                {
                    title: 'Boyana Church',
                    location: {lat: 42.68699209438178, lng: 23.319474692998153},
                    visible: true
                }
            ],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: ""
        }
    }

    onMarkerClick(props, marker, e) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
          }
        return(
            <div className="map-container" style={style}>
            <Map 
                google={this.props.google} 
                initialCenter={{lat: 42.639830774, lng: 23.259332296}} 
                zoom={12} 
                onClick={this.onMapClicked}>
            {this.state.locations.filter(location => location.visible).map( (location, index) => (
                <Marker 
                    key={index} 
                    title={location.title}
                    position={location.location} 
                    animation={window.google.maps.Animation.DROP}
                    onClick={this.onMarkerClick}
                />
            ))}
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
            </InfoWindow>
            </Map>
            <SearchMenu
                locations={this.state.locations}
                marker={this.state.activeMarker}
                filterButton={this.filterButton}
            ></SearchMenu>
            </div>
        )
    }
}

export default MapContainer
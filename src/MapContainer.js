import React, { Component } from 'react'
import InfoWindow from './InfoWindow'
import { Map, Marker } from 'google-maps-react'
import SearchMenu from './SearchMenu';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
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
                },
                {
                    title: 'Yavor`s home',
                    location: {lat: 42.616068, lng: 23.420815},
                    visible: true
                }
            ],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: "",
            query: ""
        }
    }

    onMarkerClick(props, marker, e) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
    }

    onMapClick(props) {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    }

    onListClick = (location) => {
        var markerToClick = document.querySelector(`area[title="${location}"]`);
        if(markerToClick !== null) {
            markerToClick.click()
        }
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    filterText = (query) => {
        for (const location of this.state.locations) {
            if(location.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                //locations.push(location)
                location.visible = true
            } else {
                location.visible = false
            }
        }
        this.setState({ query})
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
                onClick={this.onMapClick}>
            {this.state.locations.filter(location => location.visible).map( (location, index) => (
                <Marker 
                    key={index} 
                    title={location.title}
                    position={location.location} 
                    //animation={window.google.maps.Animation.BOUNCE}
                    onClick={this.onMarkerClick}
                    onInfoWindowOpen={this.onInfoWindowOpen} 
                    ondomready={this.onListClick}
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
                updateText={this.filterText}
                onListClick={this.onListClick}
            ></SearchMenu>
            </div>
        )
    }
}

export default MapContainer
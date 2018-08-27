import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InfoWindow extends Component {
    static propTypes = {
        marker: PropTypes.object
    }

    componentDidMount() {
        this.renderInfoWindow();

      }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.map !== prevProps.map) {
          this.renderInfoWindow();
        }
        if ((this.props.visible !== prevProps.visible ||
            this.props.marker !== prevProps.marker ||
            this.props.position !== prevProps.position)) {
            this.props.visible ?
              this.openWindow() :
              this.closeWindow();
        }
        if(this.props.marker !== prevProps.marker && this.props.marker !== null)
        this.updateContent();
      }

      renderInfoWindow() {
        let {google} = this.props;
        const iw = this.infowindow = new google.maps.InfoWindow({
          content: ''
        });
        google.maps.event
          .addListener(iw, 'closeclick', this.onClose.bind(this))
        google.maps.event
          .addListener(iw, 'domready', this.onOpen.bind(this));
      }
      updateContent() {
        //const content = this.props.marker.title;
        var self = this;
        var clientId = "IH1PNJT2DXQQZXT0WOUBI0RJTNOS02KIUZ4YN1QF1N3B1OHJ"
        var clientSecret = "BRIR5GS0UKCYBKYHXG4EPSPR5UE5ZDWI0QO53AWXGIAT3V0Q"
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" +
         clientId + 
         "&client_secret=" + 
         clientSecret + 
         "&v=20130815&ll=" + 
         this.props.marker.getPosition().lat() + "," + this.props.marker.getPosition().lng() + "&limit=1";
        var venueId = null;
        var venueName = null;
        var venueLocation = null;

         fetch(url)
            .then(
                function(res) {
                    res.json().then(function(data) {
                        console.log(data)
                        venueId = data.response.venues[0].id
                        console.log(venueId)
                        venueName = `<p>${data.response.venues[0].name}</p>`
                        console.log(venueName)
                        venueLocation = `<p>${data.response.venues[0].location.address}</p>`
                        //self.infowindow.setContent(name + location)
                    }).then(() => {
                        return fetch(`https://api.foursquare.com/v2/venues/${venueId}/photos?&oauth_token=HQ5MVSKWWJN0KJVL3X4NHQSHGBVEWWCDTJC01EAKZK3QBOTG&v=20180826`)
                    }).then(response => response.json())
                    .then(function(photo) {
                        var p = `<img src="${photo.response.photos.items[0].prefix}150x150${photo.response.photos.items[0].suffix}"/>`
                        self.infowindow.setContent(venueName + venueLocation + p)
                    })
                }
            )
      }
      onOpen() {
        if (this.props.onOpen) this.props.onOpen();
      }
      onClose() {
        if (this.props.onClose) this.props.onClose();
      }
      openWindow() {
        this.infowindow.open(this.props.map, this.props.marker);
      }
      closeWindow() {
        this.infowindow.close();
      }
      render() {
        return null;
      }
}

export default InfoWindow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchMenu extends Component {

    state = {
        query: ''
    }

    filter(event) {
        this.setState({query: event.target.value.substr(0,20)})
        //this.props.filter(event.target.value)
/*      
        var locations = []
        for (const location of this.props.locations) {
            if(location.title.indexOf(event.target) !== -1) {
                location.visible = true
                locations.push(location)
            } else {
                location.visible = false
            }
        }
        this.setState({
            filteredLocations: locations,
            query: event.target
        })
        */   
    }

    render() {
        var locations = []
        for (const location of this.props.locations) {
            if(location.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1) {
                //location.marker.setVisible(true)
                locations.push(location)
            } 
            console.log(locations)
        }

        return  (
            <div id="search">
            <div className="header"><p className="searchText">Search location</p></div>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>
            <div id="sidebarMenu">
            <input type="text" className="searchField" placeholder="Search" value={this.state.query} onChange={this.filter.bind(this)} />
            <button className="searchButton">Filter</button>
                <ul className="sidebarMenuInner">
                {locations.filter(l=>l.title != '').map( (location, index) => (
                <li key={index}>{location.title}</li>
                ))}
            </ul>
            </div>
            </div>
        )
    }
}

export default SearchMenu
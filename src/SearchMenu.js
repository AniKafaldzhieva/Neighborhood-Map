import React from 'react'
import './SearchMenu.css'

const SearchMenu = function(props) {
    //The menu design is from https://www.cssscript.com/tag/hamburger-menu/
    return  (
        <div id="search">
            <div className="header">
                <p className="searchText">Search location</p>
            </div>
                <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
                    <label 
                        tabIndex={0} 
                        role="button" 
                        aria-label="Toggled button" 
                        htmlFor="openSidebarMenu" 
                        className="sidebarIconToggle">
                            <div  className="spinner diagonal part-1"></div>
                            <div className="spinner horizontal"></div>
                            <div className="spinner diagonal part-2"></div>
                    </label>
            <div id="sidebarMenu">
                <input 
                    type="text" 
                    className="searchField" 
                    aria-labelledby="searchText"
                    placeholder="Search" 
                    onChange={(e) => props.updateText(e.target.value)}
                />
                    <ul className="sidebarMenuInner">
                        {props.locations.filter(l=>l.visible).map( (location, index) => { return (
                        <li 
                            key={index} 
                            tabIndex={0} 
                            role="button" 
                            onClick={ (e) => props.onListClick(location.title) } 
                            onKeyPress={ () => props.onListClick(location.title) }>
                            {location.title}
                        </li> )})}
                    </ul>
            </div>
        </div>
    )
}

export default SearchMenu
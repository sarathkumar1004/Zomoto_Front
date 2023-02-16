import React from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';

class Wallpaper extends React.Component {
/* Day 85*/ 
constructor() {
  super();
  this.state = {
    locations: [],
    inputText: '',
    suggestions : []
  }
}
handleLocation = (event)=> {
const locationId =event.target.value;
sessionStorage.setItem('locationId', locationId);
  
axios({
  method: 'GET',
  url: `http://localhost:3002/api/restaurent/getRestaurent/${locationId}`,
  headers: { 'Content-Type': 'application/json'}
})
.then (response=> {
  this.setState({locations : response.data.data})
  console.log(response.data.data);
})
.catch(err=> console.log(err));

  }
  
  handleSearch = (event) => {
    let inputText= event.target.value;
    const { locations} = this.state;
    console.log(locations);
    const suggestions = locations.restaurent.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
    this.setState({suggestions, inputText});
    console.log(suggestions,inputText);
  }

  showSuggestion = () => {
    const { suggestions, inputText } = this.state;
    
    if(suggestions.length === 0 && inputText === undefined) {
    return null;
    }
    if (suggestions.length > 0 && inputText === '') {
    return null;
    }
    if (suggestions.length === 0 && inputText) {
    return <ul>
    <li className="nosearch"> No Search Results Found </li>
    </ul>
    }
    return (
    <ul>
    {
    suggestions.map((item, index) => (<li  className="nosearch"key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} - ${item.locality},${item.city}`}</li>))
    }
    </ul>
    );
    }
   selectingRestaurant = (resObj) => {
    this.props.history.push(`/details2?restaurent=${resObj._id}`);
   }
  /* day 85 */
    render(){
      const { locationData }= this.props;
        return(
           <div>
             <img
      src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
      alt="not found"
      className="homeImage"
    />
             <div className="navs">
      
    </div>
    <div className="topSection">
      <div className="logos"><img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="Zomoto wallpaper"/></div>
      <div className="headerText">Discover the best food & drinks in Salem</div>
      <div className="searchOptions">
        <span>
          <select className="locationBox" /*Day 85 */ onChange={this.handleLocation }>
            <option>Select City</option>
            {locationData.map((item , e)=> {
              return <option key={e}value={item.location_id}>{`${item.name},${item.city}`}</option>
            })}
          </select>
        </span>
        <span className="searchBox">
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="searchInput"
            placeholder="Search for Restuarants"onChange={this.handleSearch}
          />
          { this.showSuggestion()}
        </span>
      </div>
    </div>
           </div>
        )

    }
}

export default withRouter(Wallpaper);
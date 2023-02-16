import React from "react";
 import { withRouter} from 'react-router-dom' 

class QuickSearchItem extends React.Component{
  handleNavigate =(mealtypeId)=> {
    // sesion storage from yesterday night jan 25 after eat  in each component session storage//
    const locationId = sessionStorage.getItem('locationId');
    if(locationId) {
      this.props.history.push(`/filter?mealtype=${mealtypeId}& location=${locationId}`);
    }
    else {
      this.props.history.push(`/filter?mealtype=${mealtypeId}`);
    }
   
  }
    render(){
      const {name,content, image,meal_type} = this.props.quickSearchitemData;
        return(
            
                    <div className="boxes" onClick={()=>this.handleNavigate(meal_type)}>
          <div className="boxContent">
            <img
              src={`${image}`}
              alt="Frienchfries, burger"
              className="qsImage"
            />
            <h4 className="itemHeading">{/*Breakfast*/} {name}</h4>
            <p className="itemDescription">
             {/*  Start your day with exclusive Breakfast options */}
             {content}
            </p>
          </div>
        </div>
        )
    }
}

export default  withRouter(QuickSearchItem);
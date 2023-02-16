import React from 'react';

import'../Styles/home.css'
import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';
import axios from 'axios';
class Home extends React.Component {
    constructor() {
        super();
        this.state= {
           /*  restaurants : [],*/
            mealtypes : [],
            location: []
        }
    }

    componentDidMount(){

       /*  axios({
            method: 'GET',
            url: 'http://localhost:3002/api/restaurent/getRestaurent',
            headers: { 'Content-Type': 'application/json'}
        })
        .then (response=> {
            this.setState({restaurant : response.data.data.restaurant})
           /*  console.log(response.data.data.restaurant[0]); */
          /*  console.log(response.data.data);
        })
        .catch(err=> console.log(err));*/

         sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:3002/api/mealtype/getAllMealTypes',
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => {
                this.setState({ mealtypes : response.data.data})
                 console.log(response.data.data); 
                /*  console.log(response.data.data.restaurent[0]); */
              
             })
            .catch(err => console.log(err));
            axios({
                method: 'GET',
                url: 'http://localhost:3002/api/location/getLocation',
                    headers: { 'Content-Type': 'application/json'}
                })
                .then(response => {
                    this.setState({location : response.data.data})
                     console.log(response.data.data); 
                    /*  console.log(response.data.data.restaurent[0]); */
                  
                })
                .catch(err => console.log(err));
            
        }


    render() {
        const { location, mealtypes} = this.state;
        return (
            <div>
               <Wallpaper locationData = { location}/>
               <QuickSearch quicksearchData={mealtypes} />
            </div>
        )
    }
}
export default Home;
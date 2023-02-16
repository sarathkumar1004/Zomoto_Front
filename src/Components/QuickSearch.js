import React from "react";
import QuickSearchItem from "./QuickSearchItem";

class QuickSearch extends React.Component {
    render(){
        
        //Day 86 //
        const {quicksearchData}=this.props;
        console.log(quicksearchData);
        //
        return(
                <div>
                    
                    <div className="bottomSection">
      <h1 className="heading1">Quick Search</h1>
      <h3 className="subHeading">Discover restuarants by type of meal</h3>
      <div className="boxContainer">
      {/*day 86*/}
      {
        quicksearchData.map((item, e)=> {
            return <QuickSearchItem quickSearchitemData = {item} key={e}/>
            
        })
      }
     
              {/*  <QuickSearchItem />
               <QuickSearchItem />
               <QuickSearchItem />
               <QuickSearchItem />
               <QuickSearchItem />
               <QuickSearchItem /> */}
               </div>
               </div>
                </div>
                
                   
        )
    }
}

export default QuickSearch;
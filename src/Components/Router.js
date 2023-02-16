import React from "react";
import { Route,BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Filter from "./Filter"
import Header from "./Header";
import Details1 from "./Details1";
import Details2 from "./Details2";
import Razzorpay from "./Razzorpay";
function Router(){
    return(
     <BrowserRouter>
     <Route path='*' component={Header}/>
     <Route exact path='/'component={Home}/>
     <Route  path='/filter'component={Filter}/>
     <Route  path='/details1'component={Details1}/>
     <Route  path='/details2'component={Details2}/>
     <Route  path='/Razzorpay'component={Razzorpay}/>
     </BrowserRouter>
    )
}
export default Router;
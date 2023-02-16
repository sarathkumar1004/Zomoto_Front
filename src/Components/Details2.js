import React from "react";
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import '../Styles/Details2.css';
import axios from "axios";
// details 1 information
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from 'react-modal';
import '../Styles/Details1.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

        const customStyles = {
            content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '60%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor:'pink',
            border: '2px solid red',
            padding: '50px'
            },
        };

class Details2 extends React.Component{
    constructor(){
        super();
            this.state = {
                restaurent : {},
                resID: undefined,
                menuItemModelIsOpen: false,
                paymentDetailsModelIsOpen: false,
                totalPrice: 0,
                totalItem: 0
            }
        }    
       

componentDidMount(){
    const qs = queryString.parse(this.props.location.search)
    const { restaurent } = qs;

    axios({
        method : 'GET',
        url :`http://localhost:3002/api/restaurent/getRestaurentDetails/${restaurent}`,
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => {
        this.setState({restaurent: response.data.data.restaurent, resID:restaurent})
        })
      .catch(err =>console.log(err));
    }

 handleOder = (state,value) => {
    // const { resID } = this.setState;
    this.setState({[state]:value});
    if(state == "menuItemModelIsOpe" && value == true ){
    const qs = queryString.parse(this.props.location.search)
    const { restaurent } = qs;

        axios({
            method : 'GET',
            url :`http://localhost:3002/api/restaurent/getRestaurentDetails/${restaurent}`,
            headers: { 'Content-Type': 'application/json'}
          })
          .then(response => {
            this.setState({restaurent: response.data.data.restaurent, resID:restaurent})
            console.log( response.data.data.restaurent)
            })
          .catch(err =>console.log(err)); 
    }
}
addItemHandler = (minprice) =>{
    const { totalPrice, totalItem } = this.state;
    this.setState({ totalPrice: totalPrice + minprice, })
    this.setState({ totalItem: totalItem + 1})
}
removeItemHandler = (minprice) =>{
   const { totalPrice, totalItem } = this.state;
   this.setState({ totalPrice: totalPrice - minprice})
   this.setState({ totalItem: totalItem - 1})
   
}
paymentHandler = () => {
    this.setState({paymentDetailsModelIsOpen: true})
}
cancelHandler = () => {
    this.setState({paymentDetailsModelIsOpen: false})
}
 notify = () => toast("Payment Successfully");
    render(){
        const { restaurent, menuItemModelIsOpen, totalPrice, totalItem, paymentDetailsModelIsOpen} = this.state;
        return(
   <div>       
       <div>
            <Carousel showThumbs={false}>
              <div>
              <img className="image"
               src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
               alt="not Found"/>
              </div>
              <div>
              <img className="image"
               src="https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc="
               alt="not Found"/>
              </div>
              <div>
              <img className="image"
               src="https://t3.ftcdn.net/jpg/02/52/63/16/240_F_252631636_qnuNZp2bx1rjXJt2ydrsMVRTaMA1Nd43.jpg"
               alt="not Found"/>
              </div>
            </Carousel>
        </div>       
            <div className="bottom">
                
            <div className="tabs">
                <h3 className="heading">{restaurent.name}</h3>
                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>
                    <TabPanel className="pannel">
                    <h4 className="contact">About This Place</h4>
                    <br/>
                        <h4 className="tittle">Cuisine</h4>
                       <ul>
                        {
                            restaurent?.cuisine?.map((item, index) => (<li key={index} >{`${item.name}`}</li>))
                        }
                        </ul>
                      <div className="costSec">
                        <h4 className="tittle">Average Cost</h4>
                    
                        <ul> Rs. {restaurent.min_price}.00</ul>
                      </div>
                    </TabPanel>
                    <TabPanel className="pannel">
                        <h4 className="contact">Contact Details</h4>
                        <h4 className="Phone">Phone number</h4>
                        <h5>+{restaurent.contact_number}</h5>
                    <div className="costSec">
                        <h4 className="tittle">{restaurent.name}</h4>
                        <p>{restaurent.locality}, <br></br> {restaurent.city}.</p>
                    </div>    
                    </TabPanel>
                </Tabs>
            </div>
            <div>
            <button className="btn-order" onClick={() => this.handleOder('menuItemModelIsOpen',true)}>Place online order</button>
            </div>
         
</div>
            <Modal
                    isOpen={menuItemModelIsOpen}
                    onRequestClose={menuItemModelIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                    
                >
                    <h2  className="menutittle">Menu Modal</h2>
                     <div className="menudetails">
                        <h5>Name : {restaurent.name}</h5> 
                        <h5>City : {restaurent.city}</h5> 
                        <h5>Contact No: +{restaurent.contact_number}</h5>  
                        <button type="button" className="btn btn-danger" onClick={() => this.handleOder('menuItemModelIsOpen',false)}>Cancel</button>
                    </div>
                    <div className="menudetails">
                       <div className="count">
                          <button type="button" className="btn btn-success" onClick={() => this.removeItemHandler(restaurent.min_price)}> - </button>
                          <button type="button" className="btn btn-light"> {totalItem}</button>
                          <button type="button" className="btn btn-success" onClick={() => this.addItemHandler(restaurent.min_price)}> + </button>
                       </div>
                       <div className="totalamt"><h5>Total Amount : {totalPrice}</h5></div>
                       
                       <div className="paybutton">
                          <button  type="button" className="btn btn-primary" onClick={() => this.paymentHandler()}>Pay Now</button> 
                       </div>
                    </div>
              
              </Modal>  

              <Modal
                    isOpen={paymentDetailsModelIsOpen}
                    onRequestClose={paymentDetailsModelIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal">
                        <h5>{restaurent.name}</h5>
                        Name:<br />
                        <input type="text" placeholder="Enter your name" />
                        <br />
                        Email:<br />
                        <input type="email" placeholder="Enter your email" />
                        <br />
                        Phone Number:<br />
                        <input type="text" placeholder="Enter yourPhone Number" />
                        <br />
                        Address:<br />
                        <input type="text" placeholder="Enter yourPhone Address" />
                        <br />
                        <br />
                        <input type="submit" value="Submit" onClick={() => this.notify()}/>
                        <ToastContainer />
                        <button onClick={() => this.cancelHandler()}>Cancel</button>
                </Modal>  
                
                        
</div>  
        )
    }
}
export default Details2;
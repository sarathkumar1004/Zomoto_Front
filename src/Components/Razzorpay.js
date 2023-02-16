import React,{useState} from "react";

import '../Styles/Razzorpay.css'
function Razzorpay() {
    const [amount, setamount ] = useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(amount === "") {
            alert("please enter amount")
        }else{
            alert(amount);
        }
    }
        return(
            <div>
            <h1 className="Razzor">Razzorpay Integretaion Using React</h1>
            <br/>
             <input type="text" className="box" placeholder="Enter Amount"value={amount}onChange={(e)=> setamount(e.target.value)} />   
             <br/><br/>
             <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>

           
        )
    }
export default Razzorpay;

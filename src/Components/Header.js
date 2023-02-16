import React from "react";
import '../Styles/Header.css'
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';

import { gapi } from 'gapi-script'
//Day 86//
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'antiquewhite',
    border: 'solid 1px brown',
    borderRadius: '5%',
    height: '400px',
    width: '350px',
    display: 'flex',
    justifyContent: 'center',

  },
}; //Day 86//
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '',
      display: 'none',
      loginModalIsOpen: false,
      createaccountModalIsOpen: false,
      isLoggedIn: false,
      loggedInUser: undefined
    }
  }

  responseGoogle = (response) => {
    this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    toast(' Google Login Successfull');
    console.log(response);
  }
  responseFacebook = (response) => {
    console.log(response.name);
    this.setState({ isLoggedIn: true, loggedInUser: response.name, loginModalIsOpen: false })
    toast('  Facebook Login Successfull');
  }
  componentDidMount() {
    const path = this.props.history.location.pathname;
    this.setAttributes(path);
  }

  setAttributes = (path) => {
    let bg, display;
    if (path === '/') {
      bg = '#000000';
      display = 'none';
    }
    else {
      bg = '#ff0000';
      display = 'inline-block';
    }
    this.setState({ backgroundColor: bg, display: display });
  }

  navigate = (path) => {
    this.props.history.push(path)
  }
  //Day 86 //
  handleLogin = () => {
    this.setState({ loginModalIsOpen: true });
  }
  handleCreateaccount = () => {
    this.setState({ createaccountModalIsOpen: true });
  }
  handleLogout = () => {
    this.setState({ isLoggedIn: false, loggedInUser: undefined })
    toast('Logout Successfull');
  }
  handleCancle = () => {
    this.setState({ createaccountModalIsOpen: false });
  }
  handleCancel = () => {
    this.setState({ loginModalIsOpen: false });
  } //day 86 Model Is open

  render() {
    const { backgroundColor, display, createaccountModalIsOpen, loginModalIsOpen, isLoggedIn, loggedInUser } = this.state
    function start() {
      gapi.client.init({
        /*  clientId:clientId, */
        scope: ""
      })
    };
    gapi.load('client:auth2', start)

    return (
      <div className="top" style={{ backgroundColor: backgroundColor }}>
        <div className="top" style={{ display: display }}>
          <div className="logo" onClick={() => this.navigate('/')}>Sk!</div>
        </div>
        {!isLoggedIn ?
          <div>
            
            <ToastContainer />
            <button className="Login" onClick={this.handleLogin}>Login</button>
           
            <button className="Createaccount" onClick={this.handleCreateaccount} >Create Account</button>
          </div>
          :
          <div>
             <ToastContainer />
            <button className="Login">{loggedInUser}</button>
            <button className="Createaccount" onClick={this.handleLogout} >Logout</button>
            <ToastContainer />
          </div>}


        {/* For create an account follow the login model method without adding google or Facebook*/}
        {/*Day 86 model */}
        <Modal
          isOpen={createaccountModalIsOpen}
          style={customStyles}
        >
          <div>
            <i className="fa-solid fa-xmark" onClick={this.handleCancle}></i>
            <h2>Createaccount</h2>
            <input type="text" placeholder='FullName' />
            <br />
            <br />
            <input type="text" placeholder='Email' />
            <br />
            <br />
            <input type="checkbox" />   I agree to Zomato's Terms of Service, Privacy Policy and Content Policies
            <div>
              <button>Createaccount</button>
              <br />
              ---------------Or---------------
              <br />
              <GoogleLogin
                clientId="219442494967-c35usdtoifs0r6e4v2q9oilpg807avt2.apps.googleusercontent.com"
                buttonText="Continue With Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />,
              <br />
              Already have an account?<a href="http://localhost:3000/">Login</a>
            </div>
            {/*   <button onClick={this.handleCancle}>Cancel</button> */}
          </div>
        </Modal>

        <Modal
          isOpen={loginModalIsOpen}
          style={customStyles}
        >
          <div>
            <h2>Login</h2>
            <input type="text" placeholder='Email' />
            <br />
            <br />
            <input type="password" placeholder='Password' />
            <br />
            <br />
            <GoogleLogin
              clientId="219442494967-c35usdtoifs0r6e4v2q9oilpg807avt2.apps.googleusercontent.com"
              buttonText="Continue With Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />,
            <br />
            <br />
            <div>
              <FacebookLogin
                appId="992558358815457"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            </div>

            <br />
            <button>Login</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </Modal>
        {/*Day 86 model */}
      </div>

    )
  }
}

export default Header;
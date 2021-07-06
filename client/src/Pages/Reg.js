import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/js/all.js';
import bgVideo from "../bgvideo.mp4";
import { useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
function Reg(){

  
  let history = useHistory();

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");




  Axios.defaults.withCredentials = true;

  



  const register = () => {
    
    if(usernameReg.length > 0 && passwordReg.length > 0 && emailReg.length > 0){
      var errorMessage = '';
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg,
      email: emailReg,
    }).then((response) => {
      
     errorMessage = response.data.status;
     swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    })
     
    });

   

    }else{

      swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Please Enter In All The Textfields!',
      })
    }
    
    if((errorMessage !== "This Username Is Already Taken!\nPlease Try A Different Username" || errorMessage !== "This Email Is Taken!")
    && (usernameReg.length > 0 && passwordReg.length > 0 && emailReg.length > 0)){
      swal.fire(
        'Congrats!',
        ' Your account is created!',
        'success'
      )
      
    }
    
  };


  




  
  

  return(
   <div className="App">
     <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
     <video autoPlay loop muted id="bgvid">
       <source src={bgVideo} type="video/mp4"/>
     </video>
     <div className = "registration">
      <h1>Sign Up</h1>
      <label>Email</label>
      
      <input type = "text"  className="textfield-email" placeholder = "&#xf0e0;    Email"  onChange={(e) => {
            setEmailReg(e.target.value);
            
          }} />
      <label>Username</label>
      <input type = "text"  className="textfield-username" placeholder = "&#xF007;    Username"  onChange={(e) => {
            setUsernameReg(e.target.value);
            
          }} />
          
          <label>Password</label>
      <input type = "password" className="textfield-password" placeholder = "&#xf023;    Password" 
      onChange={(e) => {
            setPasswordReg(e.target.value);
            
          }}
          />
          <label>Button</label>
      <button className="regBtn" onClick= {register} >Sign up</button>
      <label>Go To Main Button</label>
      <button className="regBtn" onClick= {() => {
          history.push("/")
      }} >Already Have An Account? Login</button>
      </div>

       </div>
    );
 }

 export default Reg;
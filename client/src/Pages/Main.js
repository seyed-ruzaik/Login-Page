import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/js/all.js';
import bgVideo from "../bgvideo.mp4";
import { useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

function Main(){

  
    let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  Axios.defaults.withCredentials = true;

  



  


  const login = () => {

    if(username.length > 0 && password.length > 0){
    
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
       
        swal.fire({
          position: 'center',
          icon: 'error',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        console.log(response.data);
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Signed in successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }else{
    swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Please Enter In Both The Textfields!',
    })
  }
  };




  
  

  return(
   <div className="App">
     <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
     <video autoPlay loop muted id="bgvid">
       <source src={bgVideo} type="video/mp4"/>
     </video>
      <div className = "login">
        <h1>Login</h1>
        <label>Username</label>
        <input type = "text"  className="textfield-username" placeholder = "&#xF007;    Username"  onChange={(e) => {
            setUsername(e.target.value);
          }}/>
          <label>Password</label>
        <input type = "password" className="textfield-password" placeholder = "&#xf023;    Password" onChange={(e) => {
            setPassword(e.target.value);
          }}/>
          <label>Button</label>
        <button className="logBtn" onClick={login} > Login </button>
        <label>Go To Main Button</label>
      <button className="logBtn" onClick= {() => {
          history.push("/signup")
      }} >Don't Have An Account? Sign up</button>
         </div>

       </div>
    );
 }

export default Main;
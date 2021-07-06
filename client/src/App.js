import React from "react";
import "./App.css";
import '@fortawesome/fontawesome-free/js/all.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";
import Reg from "./Pages/Reg";
import PageNotFound from "./Pages/PageNotFound";


function App(){
       return(
       <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/signup" exact component={Reg}/>
          <Route component={PageNotFound} />
        </Switch>
       </Router>
    );
 }

export default App;
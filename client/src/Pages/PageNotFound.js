import React from "react";
import "./PNF.css";

function PageNotFound(){
    document.body.style.backgroundColor = "black"
return(
<div className = "pgBody">
<section class="notFound">
        <div class="img">
        <img  src="https://assets.codepen.io/5647096/backToTheHomepage.png"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" />
        </div>
        <div class="text">
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        </div>
    </section>
</div>

);



}

export default PageNotFound;
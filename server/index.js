const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

var status = "";

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "userId",
      secret: "srilanka",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24 * 1000, //24hrs
      },
    })
  );

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "LoginSystem",
  });

  app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query(
        "INSERT INTO users (username, password, email) VALUES (?,?,?)",
        [username, hash,email],
        (err, result) => {
            
            console.log(err);
            if(err != null){
                console.log("Duplicate User!");
                console.log(err.sqlMessage);
                if(err.sqlMessage.includes("'username'")){
                  console.log("Username eroor!");
                  status = "This Username Is Already Taken!\nPlease Try A Different Username";
                }else{
                  console.log("Email eroor!");
                  status = "This Email Is Taken!";
                }
                res.send({ status });
                status = "";
                
            }
            
        }
      );
    });
  });

const verifyJWT = (req, res, next) => {

 const token = req.headers["x-access-token"]; 

if(!token){
  res.send("Need a token!");
}else{
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err){
      res.send({ auth: false, message: "You failed to authenticate!"});
    }else{
      req.userId = decoded.id;
      next();
    }
  });
}

};
  
app.get('isUserAuth', verifyJWT, (req,res)=>{
  res.send("You are Authenticated!");
});

  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, status, user: req.session.user });
      status = "";
    } else {
      res.send({ loggedIn: false });
      status = "";
    }
  });

  app.get("/register", (req, res) => {
   
      res.send({ status });
      status = "";
   
  });



  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM users WHERE username = ?;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                req.session.user = result;
                console.log(req.session.user);
                const id  = result[0].id
                const token = jwt.sign({id}, "jwtSecret", {
                  expiresIn: 300,
                })
                res.send(result);
                console.log("[Auth: "+true+"\n Token: "+token+"\nResult: ID: "+result[0].id+"\n Username: "+
                result[0].username+"\n Password: "+result[0].password+"]");
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
  });


  app.listen(3001, () => {
    console.log("running server");
  });
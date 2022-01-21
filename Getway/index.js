const express = require("express");
const axios = require('axios');
const path = require('path');
const mysql = require('mysql'); 
const NodeRSA = require('node-rsa');
const bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');
const { redirect } = require("express/lib/response");
const { response } = require("express");


const app = express();


//mySQL coonection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login-node',
  port: 3307
});

db.connect((error) => {
  if (error){
      console.log(error);
  }else{
      console.log("MYSQL connected successful...")
  }
})


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname))
app.set('view engine', '.hbs');



//app start point 
app.get("/", (req, res) => {
   res.render("login")
})

//on successful login
app.get("/home", (req,res) => {
    res.render('home.hbs');
})

//receive and store public key in db
app.post("/storeKeys", (req,res) => {
  const public_key = req.body.publicKey;

  db.query('INSERT INTO storedkeys SET ?',{publicKey: public_key}, 
  (error, results) => {
    if(error){
      console.log(error);
    }else{
      console.log("public key updated successfully")
      console.log(public_key)
    }
   })
})


//login endpoint
app.post("/login", (req, res) => {

    const reqBody = {
      email: req.body.email,
      password: req.body.password
    };

    // Query the db for public key and Encrypt reqBody using the public key
    sendRequest();
   function sendRequest(){

    //Query database for public key
    db.query(
      'SELECT * FROM storedkeys ORDER BY id DESC LIMIT 1', 
      (error, results) => {
        if (error){
          console.log(error)
        }
        else{
          const key_public = results[0].publicKey;
          
          const keyPublic = new NodeRSA(key_public);
         
          const encryptedString = keyPublic.encrypt(reqBody, 'base64');
          console.log(encryptedString);

          axios
        .post('http://localhost:4001/authenticate',{
            encryptedString: encryptedString
        })
        .then(response => {
          console.log(`statusCode is : ${response.data.statusCode}`)
          
          if(response.data.statusCode === 200) {
              console.log(response.data.statusMessage);
              res.render("home");
          }
          else if(response.statusCode !== 200) {
              console.log(response.data.statusMessage);
              return res.render("login", {
                  message: 'You entered an incorrect email/password',
              });
          }
        })
        .catch(error => {
          console.error(error)
        })
        }})

   }    
});

app.listen(4000, () => {
    console.log("Server started on port 4000")
})
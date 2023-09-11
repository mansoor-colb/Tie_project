const express = require("express");
const app = express();
const crypto = require('crypto');
const path = require("path");
const nodemailer=require('nodemailer')
// let formidable = require('formidable');
let fs = require('fs');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");


app.use(bodyParser.json());
app.use(express.static('public'))



const conn = mysql.createConnection({
	multipleStatements: true,
	host: "localhost",
	user: "root",
	password: "",
	database: "music_band",

});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});





const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};
const getRandomNumber = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  };
  
  
const secretKey = '99809933334455667788990099887766'; 
const iv = '9980993333445566';

async function encrypt(text=getRandomNumber()){
    const randomSixDigitNumber = text;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey,'utf-8'),iv);
    let encryptedData = cipher.update(randomSixDigitNumber.toString(), 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;

}

async function decrypt(encryptedData){
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey,'utf-8'), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;

}
//register
app.post("/signup", async (req,  res) => {
    var id=await encrypt();
    var pid=await encrypt(req.body.Pass);
    let data = { aid : id,artist_name: req.body.Artist,artist_email:req.body.Email,artist_pass:pid};
	let sql = "INSERT INTO artists SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) {
            res.send(JSON.stringify({ status: 500, error: null, response: result }));
            throw err
        
	}
	else{
		res.send(JSON.stringify({ status: 200, error: null, response: id }));

	}
	})

	})

//login
    app.post("/signin", (req, res) => {
        let sql = `SELECT * FROM artists where artist_email="${req.body.Artist}"`;

        let query = conn.query(sql, async (err, result) => {
            if (result.length!=0) {
               var pid= await decrypt(result[0].artist_pass)
               console.log(pid);
                if(pid==req.body.Pass){
                    res.send(JSON.stringify({ status: 200, error: null, response: result }));
                }
                else{
                    res.send(JSON.stringify({ status: 500, error: null, response: result }));

                }
            
                
            
          
        }
        else{
            res.send(JSON.stringify({ status: 700, error: null, response: result }));
    
        }
        })
    
        })

const PORT = process.env.PORT || 1233;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
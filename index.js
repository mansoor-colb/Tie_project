const express = require("express");
const app = express();
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
	database: "uid2",

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
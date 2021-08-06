const express = require ("express");
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeUrl = require('./routing/route');
const cors = require('cors');
const path = require("path");
const url =  require('url');
const fs = require("fs");


dotenv.config()
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("database connected success")
})

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use('/app', routeUrl)
app.use(express.static(path.join(__dirname, 'build')));

app.post("/SignIn", (req, res) => {
    res.send("Sign in successfull")
})

app.post("/SignUp", (req, res) => {
    res.send("SignUp successfull")
})



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server is running")
})


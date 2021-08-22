const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const fileUpload = require("./uploads/fileUpload");
const port = 9090;


app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res)=>{ res.sendFile(path.join(__dirname), '/index.html'); })


//file upload
app.post('/upload/profile', fileUpload);


app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("success!");
    }
})

module.exports = app;
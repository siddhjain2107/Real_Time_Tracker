const express = require("express");
const app = express();

const http = require("http");
const path = require("path");
require('dotenv').config();

const socketio = require("socket.io");

const server = http.createServer(app);
   
const io = socketio(server);


  
app.use(express.json())
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{ 
    res.render("index") 
    }); 

io.on("connection", function (socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id:socket.id, ...data});
    });
    
    socket.on("user-disconnected",function() {

        io.emit("user-disconnected",socket.id);

    });

});
     
 
  
server.listen(process.env.PORT, () => {
    console.log("backend Connected Successful");
});



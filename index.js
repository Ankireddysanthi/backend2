const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const cors=require("cors")
const {connected}=require("./config/db")
const {userroute}=require("./controller/userroute");
const{gamesroute}=require("./controller/games")
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Working")
})
app.use("/user",userroute);
app.use("/game",gamesroute)
app.listen(process.env.port,async()=>{
    try{
        await connected;
        console.log("connectedmongodb")
    }catch(err){
    }
    console.log("server")
  })
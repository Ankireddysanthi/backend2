const express=require("express")
const gamesroute=express.Router();
const{gamemodel}=require("../model/gamesmodel")
const {auth}=require("../middleware/authorization");
const jwt=require("jsonwebtoken");

gamesroute.get("/all",auth,async(req,res)=>{
    // let token=req.headers.authorization;
    // let decoded=jwt.verify(token,"shhhhh");
   // console.log(decoded)
    try {
        let data=await gamemodel.find({"userid":req.body.userid});
        if(data.length!=0) res.send(data);
        else res.send({"msg":"No Data"})
        
    } catch (error) {
        res.send({msg:"error msg"})
    }
})
gamesroute.post("/add",auth,async(req,res)=>{
    const {name,version,rating}=req.body;
    try{
        let newdata=new gamemodel(req.body);
        await newdata.save();
        res.send({msg:"newdata added"})

    }catch(err){
      res.send("error")
    }
})
gamesroute.delete("/delete/:id",async(req,res)=>{
const {id}=req.params;
try{
    let data=await gamemodel.find({_id:id});
    if(data.length!==0){
        await gamemodel.findByIdAndDelete({_id1:id});
        res.send({msg:"note data deleted"})
    }else{
        res.send({msg:"unable to dalete","error":"no data exit with the given id"})
    }

}catch(err){
    res.send({mas:"error"})
}

})
gamesroute.put("/update",async(req,res)=>{
    const {id}=req.params;
    try{
        let data=await gamemodel.find({_id:id});
        if(data.length!==0){
            await gamemodel.findByIdAndUpdate({_id1:id});
            res.send({msg:"note data update"})
        }else{
            res.send({msg:"unable to update","error":"no data exit with the given id"})
        }
    
    }catch(err){
        res.send({mas:"error"})
    }
})

module.exports={
    gamesroute
}
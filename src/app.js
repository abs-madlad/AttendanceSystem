const express= require("express")
const app= express();

//middleware to parse json
app.use(express.json())

//health check route
app.get("/health", (req,res)=>{
    res.json({
        success:true,
        data: "Server up and running"
    });
});

module.exports=app; 
const express= require("express")
const validate = require("./middleware/validate");
const {signupSchema}= require("./validations/auth.validation");
const { success } = require("zod");
const authRoutes= require("./routes/auth.routes")
const app= express();

//middleware to parse json
app.use(express.json())

app.use("/auth", authRoutes);

//health check route
app.get("/health", (req,res)=>{
    res.json({
        success:true,
        data: "Server up and running"
    });
});

app.post("/test-signup", validate(signupSchema), (req,res)=>{
    res.json({
        success:true,
        data: "valid input",
    })
})

module.exports=app; 
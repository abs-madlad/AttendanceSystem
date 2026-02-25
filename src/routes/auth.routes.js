const express= require("express")
const router= express.Router();

const validate= require("../middleware/validate")
const {signupSchema, loginSchema}= require("../validations/auth.validation")

const {signup, login}= require("../controllers/auth.controller");
const authMiddleware= require("../middleware/auth.middleware");

//route for user signup
router.post("/signup", validate(signupSchema), signup);

//login
router.post("/login", validate(loginSchema), login);

//Me route
router.get("/me", authMiddleware, (req,res)=>{
    return res.status(200).json({
        success: true,
        data: req.user,
    });
});

module.exports= router;
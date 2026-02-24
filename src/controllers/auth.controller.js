const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require("../models/User");

const signup= async (req,res)=>{
    try{
        const {name, email, password, role}= req.body;

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                error: "Email already in use"
            });
        }
        //hash the password
        const hashedPassword= await bcrypt.hash(password, 10);
        //now create the user
        const user= await user.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
}

const login= async (req,res)=>{
    try{
        const {email, password}= req.body;

        //1st step is to check if the user exists or not
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                error: "Invalid email or password",
            });
        }
        //2nd step is to compare the password
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                error: "Invalid email or password",
            });
        }

        //3rd step is to generate a JWT token
        const token= jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.HWT_SECRET,
            {expiresIn: "1d"}
        );
        return res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
};
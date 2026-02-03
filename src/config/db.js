const mongoose= require("mongoose")

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection was successfull boss, MongoDB is online and ready to use");
    }
    catch(error){
        console.error("Database connection failed boss, we need to dig further to find out who fucked up", error.message);
        process.exit(1);
    }
};

module.exports= connectDB;
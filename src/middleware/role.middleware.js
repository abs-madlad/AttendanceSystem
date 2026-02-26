const requireTeacher= (req,res,next)=>{
    if(req.user.role !== "teacher"){
        return res.status(403).json({
            success:false,
            error:"Request denied, teacher access required",
        })
    }
    next();
}
module.exports= requireTeacher;
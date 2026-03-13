const Class= require("../models/Class")
const User= require("../models/User")

const createClass= async (req,res)=>{
    try{
        const {className}= req.body;
        const newClass= await Class.create({
            className,
            teacherId: req.user.userId,
            studentIds: [],
        });

        return res.status(201).json({
            success: true,
            data: newClass,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}

const addStudent= async (req,res)=>{
    try{
        const {id}= req.params;
        const {studentId}= req.body;

        const foundClass= await Class.findById(id);
        if(!foundClass){
            return res.status(404).json({
                success: false,
                error: "Class not found"
            });
        }
        if(foundClass.teacherId.toString() !== req.user.userId){
            return res.status(403).json({
                success: false,
                error: "Request denied, you are not the class teacher"
            });
        }

        const student= await User.findById(studentId);
        if(!student || student.role !== "student"){
            return res.status(404).json({
                success: false,
                error: "Student doesn't exist"
            })
        }

        if(foundClass.studentIds.includes(studentId)){
            return res.status(400).json({
                success: false,
                error: "Student already enrolled in the class"
            })
        }
        foundClass.studentIds.push(studentId);
        await foundClass.save();
        return res.status(200).json({
            success: true,
            data: foundClass,
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        })
    }

}

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundClass = await Class.findById(id).populate(
      "studentIds",
      "_id name email"
    );

    if (!foundClass) {
      return res.status(404).json({
        success: false,
        error: "Class not found",
      });
    }

    const isTeacherOwner =
      foundClass.teacherId.toString() === req.user.userId;

    const isEnrolledStudent = foundClass.studentIds.some(
      (student) => student._id.toString() === req.user.userId
    );

    if (!isTeacherOwner && !isEnrolledStudent) {
      return res.status(403).json({
        success: false,
        error: "Forbidden",
      });
    }

    return res.status(200).json({
      success: true,
      data: foundClass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
const {Z}= require('zod')

const createClassSchema= z.object({
    className: Z.string().min(1, "Class name is required"),
});

const addStudentSchema= z.object({
    studentId: Z.string().min(1,"Student ID is required"),
})

const startAttendanceSchema= z.object({
    classId: Z.string().min(1, "Class ID is required"),
})

module.exports={
    createClassSchema,addStudentSchema,startAttendanceSchema,
}
const {z}= require('zod');

const signupSchema= z.object({
    name: z.string().min(1, "Name should have atleast 1 character"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password should have atleast 6 characters"),
    role: z.enum(["teacher","student"]),
});

const loginSchema= z.object({
    email: z.string().email("Inavlid email address"),
    password: z.string().min(1, "password is required"),
});

module.exports= {
    signupSchema,loginSchema
}
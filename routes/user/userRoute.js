import { sendMail } from "../../mail.js";
import { findByEmail, getAllUsers, getReferrersName, login, loginWithToken, registerUser, resetPassword } from "./controller.js";
import { VerifyToken } from "./verify.js";
import express from "express";
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',login)
userRouter.post('/token/:tk',VerifyToken,loginWithToken)
userRouter.get('/ref/:id',getReferrersName)
userRouter.get('/all',getAllUsers)
userRouter.post("/findemail",findByEmail)
userRouter.post("/reset/:id",resetPassword)


export default userRouter
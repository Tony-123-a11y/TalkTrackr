import express from 'express';
import { body } from 'express-validator'
import { validationHandler } from '../middlewares/validatorHandler.js';
import { getMeetings, getUser, googleAuth, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { requireAuth } from '../middlewares/requireAuth.js';
export const userRouter = express.Router();


userRouter.post('/register',
    [

        body('emailId')
            .notEmpty().withMessage('Email Id is Required')
            .isEmail().withMessage('Invalid Email Address'),

        body('password')
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
            .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
            .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
            .matches(/[0-9]/).withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)")
    ],
    validationHandler
    , registerUser
)
userRouter.get('/fetchUser',requireAuth,getUser)
userRouter.post('/googleLogin',googleAuth)
userRouter.post('/login', loginUser)
userRouter.get("/meetings", requireAuth,getMeetings)
userRouter.post('/logout',logoutUser)

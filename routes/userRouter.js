import express, { application, response } from 'express'
const router = express.Router();
import userController from '../controller/user-Controller.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//login Handling
router.post('/signin', (req, res) => {
    const userData = req.body;
    userController.diSignIn(userData)
        .then((response) => {
            if (response.status) {
                req.session.userLoggedIn = true;
                req.session.user = response.user;

                let userID = response.user._id.toString();
                //sent token to cookie
                const token = jwt.sign({ user: userID }, process.env.JWT_SECRET);
                //send token to cookie
                let obj = {
                    id: response.user._id.toString(),
                    name: response.user.name,
                    email: response.user.email
                }
                res.cookie('token', token, {
                    httpOnly: true,
                })
                    .json(obj)
            } else {
                res.json(response)
            }
        }).catch((err) => {
            console.log(err);
        })
})

//Register Handling
router.post('/signup', (req, res) => {
    const userData = req.body;
    userController.doSignUp(userData)
        .then((response) => {
            if (response.status) {
                res.json({ action: response.status, message: response.message })
            } else {
                res.json({ action: response.status, message: response.message })
            }
        }).catch((err) => {
            res.json({ action: false, message: err })
        })
})

//Forgot Password
router.post('/forgot', (req, res) => {
    const data = req.body;
    userController.forgotPassword(data)
        .then((response) => {
            if (response.status) {
                res.json(response)
            } else {
                res.json(response)
            }
        }).catch((err) => {
            console.log(err)
        })
})

export default router;
import express, { json, response } from 'express'
const router = express.Router();
import adminController from '../controller/admin-Controller.js'

//Adminn login functinality
router.post('/signin', (req, res) => {
    const adminData = req.body;
    adminController.doLogin(adminData).then((response) => {
        if (response.admin) {
            res.json(response)
        } else {
            res.json(response)
        }
    })
})

//Get All Users fro Admin Home Page
router.get('/all/users', (req, res) => {
    adminController.getAllUsersList()
        .then((response) => {
            res.json(response)
        })
})

//delete User in admin side
router.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;
    adminController.deleteuser(userId)
        .then((response) => {
            if (response.status) {
                res.json(response)
            }
        }).catch((err) => {
            console.log(err)
        })
})

//get a sigle user
router.get('/get/edit/user/:id', (req, res) => {
    const userId = req.params.id;
    adminController.getEditUser(userId)
        .then((response) => {
            if (response.noUser) {
                res.json(response)
            } else {
                res.json(response)
            }
        }).catch((err) => {
            console.log(err)
            res.json(err)
        })
})

//Edit User Details for Admin
router.post('/edit/user', (req, res) => {
    const editDetails = req.body;
    adminController.EditUser(editDetails)
        .then((response) => {
            res.json(response);
        }).catch((err) => {
            console.log(err)
        })
})

export default router;
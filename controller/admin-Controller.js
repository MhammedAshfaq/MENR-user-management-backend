import { get } from '../database/connection.js';
import collection from '../database/collection.js';
import { ObjectId } from 'mongodb';
import bcryptjs from 'bcryptjs'

const adminController = {
    doLogin: (adminDetails) => {
        return new Promise(async (resolve, reject) => {
            let admin = await get().collection(collection.ADMIN_COLLECTION).findOne({ email: adminDetails.email });
            if (admin) {
                if (admin.id === adminDetails.id) {
                    if (admin.password === adminDetails.password) {
                        resolve({ admin: true, message: 'authontification successed' })
                    } else {
                        resolve({ admin: false, message: 'Unauthorized : Your authorization failed please try valid password' })
                    }
                } else {
                    resolve({ admin: false, message: 'Unauthorized : Your authorization failed please try valid ID' })
                }
            } else {
                resolve({ admin: false, message: 'Unauthorized : Your authorization failed please try valid credentials' })
            }
        })
    },
    getAllUsersList: () => {
        return new Promise(async (resolve, reject) => {
            const allUsers = await get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(allUsers)
        })
    },
    deleteuser: (userId) => {
        return new Promise((resolve, reject) => {
            get().collection(collection.USER_COLLECTION).deleteOne({ _id: ObjectId(userId) }).then(() => {
                resolve({ status: true, message: 'User deleted' })
            })
        })
    },
    getEditUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            const userDetails = await get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) });
            if (userDetails) {
                resolve(userDetails)
            } else {
                resolve({ noUser: true, message: 'Network error' })
            }
        })
    },
    EditUser: (editDetails) => {
        return new Promise(async (resolve, reject) => {
            let user = await get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(editDetails.id) })
            if (user) {
                editDetails.password = await bcryptjs.hash(editDetails.password, 10);
                get().collection(collection.USER_COLLECTION).updateOne({ _id: user._id }, {
                    $set: {
                        name: editDetails.name,
                        email: editDetails.email,
                        password: editDetails.password,
                        date: user.date

                    }
                }).then(() => {
                    resolve({ status: true, message: 'Updating Successed' })
                })
            }
        })
    }
}

export default adminController;
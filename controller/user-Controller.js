import { get } from '../database/connection.js';
import collection from '../database/collection.js';
import bcriptjs from 'bcryptjs'

const userController = {
    doSignUp: (userDetails) => {
        return new Promise(async (resolve, reject) => {
            //checking user existing
            let user = await get().collection(collection.USER_COLLECTION).findOne({ email: userDetails.email });
            if (user) {
                resolve({ status: false, message: 'This email is alredy existed' })
            } else {
                userDetails.password = await bcriptjs.hash(userDetails.password, 10);
                const newUser = {
                    name: userDetails.name,
                    email: userDetails.email,
                    password: userDetails.password,
                    date: new Date()
                }
                get().collection(collection.USER_COLLECTION).insertOne(newUser).then((response) => {
                    resolve({ status: true, message: 'Registered' })
                })
            }
        })
    },
    diSignIn: (userDetails) => {
        return new Promise(async (resolve, reject) => {
            let response = {};

            let user = await get().collection(collection.USER_COLLECTION).findOne({ email: userDetails.email });
            if (user) {
                bcriptjs.compare(userDetails.password, user.password).then((status) => {
                    if (status) {
                        response.status = true;
                        response.message = 'Logging successfully';
                        response.user = user;
                        resolve(response)
                    } else {
                        response.status = false;
                        response.message = "Your password dosen't right"
                        resolve(response)
                    }
                })
            } else {
                response.status = false
                response.message = "This emial not registered here!"
                resolve(response)
            }
        })
    },
    forgotPassword: (data) => {
        return new Promise(async (resolve, reject) => {
            const user = await get().collection(collection.USER_COLLECTION).findOne({ email: data.email });
            if (user) {
                data.password = await bcriptjs.hash(data.password, 10);
                get().collection(collection.USER_COLLECTION).updateOne({ email: data.email }, {
                    $set: {
                        name: user.name,
                        email: user.email,
                        password: data.password,
                        date: user.date
                    }
                }).then((response) => {
                    resolve({ status: true, message: 'Successfully' })
                })
            } else {
                resolve({ status: false, message: 'This emial not registered here' })
            }

        })

    }
}

export default userController;
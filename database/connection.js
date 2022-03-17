import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const state = {
    db: null
}

export const connect = (done) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return done(err);
        state.db = client.db(process.env.DB_NAME);
        done();
    })
}

export const get = () => {
    return state.db
}
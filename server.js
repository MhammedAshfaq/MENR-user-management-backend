import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';


//Helpers
import { connect } from './database/connection.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
const app = express();
dotenv.config();


//Middlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'Key',
    resave: false,
    saveUninitialized: true,
}))

//Base Routes Setting
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);


//Database connection
connect((err) => {
    if (err) {
        console.log('Database Conncetion Error');
        console.log(err)
    } else {
        console.log('Database Connection Established');
    };
});


//PORT setting 
app.listen(process.env.PORT, () => console.log(`Server is Running PORT ${process.env.PORT}`));
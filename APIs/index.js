import express from 'express';
// import { connect } from 'http2';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import listingRoute from './routes/listingRoute.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => { console.log('MongoDB connected') }).catch((err) => { console.log(err) });

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () =>{
    console.log('server is running on  port 3000 ...')
})
app.use('/api/user', userRoute );
app.use('/api/auth', authRoute );
app.use('/api/listing',listingRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});


// app.post("/api/auth/signup", (req, res) => {
//     console.log(req.body); // Should print the JSON data from Insomnia
//     res.status(200).json({ message: "Signup successful!" });
// });
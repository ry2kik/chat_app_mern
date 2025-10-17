import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
const app = express();

dotenv.config({ path: './.env' })
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    // ? Whitelisting the domain
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', userRouter);
app.use('/api/message', messageRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Successfully connected to the DB');
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something wrong happened: ', err);
        }
        console.log(`You are listening at port number ${ port }.....`);
    });
}).catch(err => {
    console.log('Error in connecting to the DB: ', err);
})

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { chats } = require('./data/data');
const userRouter = require('./routes/user.routes');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    // ? Whitelisting the domain
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', userRouter);

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

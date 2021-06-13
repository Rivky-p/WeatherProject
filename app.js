const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routers/api');
const bodyParser=require('body-Parser');

app.use(bodyParser.json());
app.use('/',router);



const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log('error:', err);
    });

app.listen(3000, function () {
    console.log("listening on port 3000");
})
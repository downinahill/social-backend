import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path';
import Pusher from 'pusher'

// const express = require('express')

const routes = require('./routes');

// const cors = require('cors')

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
//app config
Grid.mongo = mongoose.mongo
const app = express()
const port = process.env.PORT || 3000

//Session Secret
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ // All this added below
        uri: process.env.MONGODBURI,
        collection: 'mySessions'
    }),
    cookie:{
        sameSite: 'none',
        secure: true
}
}))

//middleware
app.use(bodyParser.json())
app.use(cors())

//DB config

//api routes
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

//listen
app.listen(port, () => console.log("Listening on localhost: ${port}"))
//const express = require('express')
//const mongoose = require("mongoose")
//const cors = require('cors')
//const dotenv = require('dotenv')
//const bcrypt = require('bcrypt')

import express from "express";
import mongoose from "mongoose";
import cors from 'cores';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const app = express()
//app.use(express.json());

dotenv.config();

app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conncted to database successfuly"))
.catch(err => console.log("Faild to connect to database",err))

app.listen(process.env.PORT,() => {
    console.log('Server is running on port 3001');
});
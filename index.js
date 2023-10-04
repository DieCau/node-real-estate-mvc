//const express = require("express"); // CommonJS
import express from 'express' //ES Module
import userRouter from './routes/userRoutes.js'
import db from './config/db.js'


// Create app
const app = express();

// Enable reading data from forms
app.use(express.urlencoded({ extended: true })) 


// Connection database
try {
    await db.authenticate()
    db.sync()
    console.log('Correct connection with database')
} catch (error) {
    console.log(error)
}


// Settings
app.set('view engine', 'pug')
app.set('views', './views')

// Public folder
app.use( express.static('public'))


// Routing
app.use('/auth', userRouter)

//Configure Port and start project
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server on listen ${port}`);
})

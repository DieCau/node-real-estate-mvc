//const express = require("express"); // CommonJS
import express from 'express' //ES Module
import userRouter from './routes/userRoutes.js'
import db from './config/db.js'


// Create app
const app = express();

// Connection database
try {
    await db.authenticate()
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
const port = 3000;

app.listen(port, () => {
  console.log(`Server on listen ${port}`);
})

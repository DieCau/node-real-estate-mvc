//const express = require("express"); // CommonJS
import express from "express"; //ES Module
import userRouter from './routes/userRoutes.js'

// Create app
const app = express();

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

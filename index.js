const express = require('express')
const app = express()
const studentController = require('./controllers/students.js')
const cors = require('cors')
require('dotenv').config();

//Middleware
//Enable all CORS Requests
app.use(cors())

app.get('/api', (req, res) => {
    res.send('API for student directory')
})

//redirecting request to controllers
app.use ('/api/students', studentController)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
const express = require('express')
const app = express()
const studentController = require('./controllers/students.js')


app.get('/api', (req, res) => {
    res.send('API for student directory')
})

//redirecting request to controllers
app.use ('/api/students', studentController)

app.listen(3000, () => {
    console.log('listening on port 3000')
})
const express = require('express')
const students = express.Router()
const db = require('../models/students.js')

students.get('/', async (req, res) => {
    cmd = 'SELECT * FROM students'
    try {
        const result = await db.query(cmd)
        res.json(result.rows)
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Errror')
    }
})

module.exports = students
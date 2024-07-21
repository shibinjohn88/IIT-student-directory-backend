const express = require('express')
const students = express.Router()
const db = require('../models/students.js')
const bodyParser = require('body-parser')

// Middleware 
// parse JSON in request body
students.use(bodyParser.json())


//get list of all students in the db
students.get('/', async (req, res) => {
    const cmd = 'SELECT * FROM students'
    try {
        const result = await db.query(cmd)
        res.json(result.rows)
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Errror')
    }
})

//add a student to db
students.post('/', async (req, res) => {
    const { firstname, lastname, dob, grade, email } = req.body
    const cmd = 'INSERT INTO students (firstname, lastname, birthdate, grade, email) VALUES ($1, $2, $3, $4, $5)'
    try {
        const result = await db.query(cmd, [firstname, lastname, dob, grade, email]);
        res.status(201).json({"status:": "success"});
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

//get details of a specific student by student id
students.get('/:id', async (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        const cmd = 'SELECT * FROM students where studentid=$1'
        try {
            const result = await db.query(cmd, [id])
            res.json(result.rows)
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Errror')
        }
    }
    
})

//delete a student record
students.delete('/:id', async (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        const cmd = 'DELETE FROM students where studentid=$1 RETURNING *'
        try {
            const result = await db.query(cmd, [id])
            if (result.rows.length === 0) {
                res.status(404).json({"error": "Student not found"});
            } else {
                res.status(201).json({"status": "success"})
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Errror')
        }
    }
    
})

//update a student record
students.put('/:id', async (req, res) => {
    let id = req.params.id
    const { firstname, lastname, dob, grade, email } = req.body
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        const cmd = 'UPDATE students set firstname = $1, lastname = $2, birthdate = $3, grade = $4, email = $5 where studentid=$6 RETURNING *'
        try {
            const result = await db.query(cmd, [firstname, lastname, dob, grade, email, id])
            res.json(result.rows)
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Errror')
        }
    }
})

module.exports = students
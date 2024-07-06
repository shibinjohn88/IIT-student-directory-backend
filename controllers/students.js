const express = require('express')
const students = express.Router()
const db = require('../models/students.js')
const bodyParser = require('body-parser')

// Middleware 
// parse JSON in request body
students.use(bodyParser.json())


//get list of all students in the db
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

//add a student to db
students.post('/', async (req, res) => {
    const { firstname, lastname, birthdate, grade, email } = req.body
    cmd = 'INSERT INTO students (firstname, lastname, birthdate, grade, email) VALUES ($1, $2, $3, $4, $5)'
    try {
        const result = await db.query(cmd, [firstname, lastname, birthdate, grade, email]);
        res.status(201).json({"status:": "success"});
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

//get details of a specific student by student id
students.get('/:id', async (req, res) => {
    id = req.params.id
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        cmd = 'SELECT * FROM students where studentid=$1'
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
    id = req.params.id
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        cmd = 'DELETE FROM students where studentid=$1'
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

//update a student record
students.put('/:id', async (req, res) => {
    id = req.params.id
    const { firstname, lastname, birthdate, grade, email } = req.body
    if (isNaN(id)) {
        res.status(400).send('Student ID not valid')
    }
    else {
        cmd = 'UPDATE students set firstname = $1, lastname = $2, birthdate = $3, grade = $4, email = $5 where studentid=$6'
        try {
            const result = await db.query(cmd, [firstname, lastname, birthdate, grade, email, id])
            res.json(result.rows)
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Errror')
        }
    }
})

module.exports = students
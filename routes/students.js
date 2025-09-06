const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all students
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT 
            c.course_name, 
            AVG(e.grade) as average_grade
                    FROM enrollments e
                    JOIN courses c ON e.course_id = c.course_id
                    GROUP BY c.course_name;`);


        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Insert a new student
router.post('/', async (req, res) => {
    const { first_name, last_name, email, enrollment_date } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, enrollment_date]
        );
        
        res.status(201).json({
            student_id: result.insertId,
            first_name,
            last_name,
            email,
            enrollment_date
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', 
            [req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Update student details
router.put('/:id', async (req, res) => {
    const { first_name, last_name, email } = req.body;

    await pool.query("START TRANSACTION");  
    
    
    try {
        const [result] = await pool.query(
            'UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE student_id = ?',
            [first_name, last_name, email, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({
            student_id: req.params.id,
            first_name,
            last_name,
            email,
            enrollment_date
        });
        await pool.query("COMMIT");
    } catch (err) {
        await pool.query("ROLLBACK");
        console.error(err);
        res.status(500).send('Server Error');
    }
});




module.exports = router;
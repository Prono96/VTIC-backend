-- Get all students with their enrolled courses
SELECT s.first_name, s.last_name, c.course_name, e.grade
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;


-- Get average grade per course
SELECT c.course_name, AVG(e.grade) as average_grade
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
GROUP BY c.course_name;

-- Get students with above average grades
SELECT s.first_name, s.last_name, e.grade
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE e.grade > (SELECT AVG(grade) FROM enrollments);

-- connection string for mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');
const studentRoutes2 = require('./routes/student2');
const auth = require('./routes/auth');
const session = require('express-session');
const passport = require('./config/auth');

// const router = express.Router();
const connectDB = require('./config/db2');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

app.use(session({
  secret: 'togoodtobetrue', 
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

/* OAuth Middleware */
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/api/students', studentRoutes);
app.use('/api/students', studentRoutes2);
app.use('/api/', auth);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/add', async (req, res) => {
//   const { name, email, age } = req.body;

  try {
    const user = new User({ 
        name: "Chiboy25", 
        email: "Chiboy25@gmail.com", 
        age: 19,
        password: await bcrypt.hash("newDay25", saltRounds)
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/get', async (req, res) => {
//   const { name, email, age } = req.body;

// await bcrypt.hash("newDay25", saltRounds)

const id = '688ddc03470f17574fa900e7'
const storedHash = "$2b$10$eNPSyBBAeJurNef8A9TIeOKWCRvJ0X25k.uQmuMiAF67yMPGwb/H6"

  try {
    const user = await User.findById(id)

    user.password = await bcrypt.compare("newDay2555", storedHash); 
  
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
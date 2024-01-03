// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/smartscheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define user schema and model
// const User = mongoose.model('User', {
//   username: String,
//   email: String,
//   age: Number,
// });

// // Express middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Route to display a form for adding a new user
// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/login.html');
// });

// // Route to handle the form submission and add a new user to MongoDB
// app.post('/login', async (req, res) => {
//   try {
//     const { username, email, age } = req.body;

//     // Create a new user instance
//     const newUser = new User({
//       username,
//       email,
//       age,
//     });

//     // Save the user to the database
//     await newUser.save();

//     var uname=Document.getElementById('username')
//     res.send('Hi {username}!');
//   } catch (error) {
//     res.status(500).send('Error adding user to the database.');
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



                                              //2nd success
// backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/smartscheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const newUser = new User({ username, password });
//     await newUser.save();
//     res.json({ success: true, message: 'User registered successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error registering user.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



                                    //3rd 

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/smartscheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

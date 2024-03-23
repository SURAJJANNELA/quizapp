const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userapp = express.Router();

// User authentication middleware
function authenticateUser(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.send({ error: 'Please provide a valid token' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.send({ error: 'Invalid token' });
  }
}

// User registration
userapp.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'Please provide a valid username, email, and password' });
  }
            
  // Check if user already exists
  const userExists = await usercollectionobject.findOne({ email });
  if (userExists) {
    return res.status(400).send({ error: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to the database
  const user = { username, email, password: hashedPassword };
  const result = await usercollectionobject.insertOne(user);
  if (!result) {
    return res.status(500).send({ error: 'Error saving user to the database' });
  }

  return res.status(201).send({ message: 'User registered successfully', user: result.ops[0] });
});
              
// User login
userapp.post('/login', async (req, res) => {
  const { email, password } = req.body;
         
  if (!email || !password) {
    return res.status(400).send({ error: 'Please provide a valid email and password' });
  }
             
  // Check if user exists
  const user = await usercollectionobject.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  // Generate a token
  const token = jwt.sign({ userID: user._id, name: user.username }, 'your_jwt_secret_key', { expiresIn: '2h' });

  return res.status(200).send({ message: 'Login successful', token });
});

// User-specific routes
userapp.get('/profile', authenticateUser, (req, res) => {
  // Return user's profile
});

userapp.put('/profile', authenticateUser, (req, res) => {
  // Update user's profile
});

userapp.delete('/profile', authenticateUser, (req, res) => {
  // Delete user's profile
});

const app = express();

function errorhandler(err, req, res, next) {
  res.send({ errMessage: err.message });
}

app.use(errorhandler);

app.use('/user-api', userapp);

app.listen(5000, () => console.log('Port number 5000 assigned successfully'));
const express = require("express");
const bodyParser = require('body-parser');

// DEMO ONLY DATA METHOD
// YOU PROBABLY DON'T WANT TO DO IT THIS WAY
const db = require('./db/db');
const dbUsers = db.users;

const app = express();
const port = 3000;

// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Define value to return for GET users
app.get('/api/users', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: 'users retrieved successfully',
    users: dbUsers
  });
});

// Define value to return for GET single user
app.get('/api/users/:userId', (req, res) => {
  let userId = req.params.userId;
  if (dbUsers[userId-1]) { // shift 1 to left to match 0 based index
    return res.status(200).send({
      success: 'true',
      message: 'user retrieved successfully',
      user: dbUsers[userId-1] // shift 1 to left to match 0 based index
    });
  } else {
    return res.status(404).send({
      success: 'false',
      message: `user with id ${userId} does not exist`,
      user: {}
    });
  }
});

// Define value to return for POST users
app.post('/api/users', (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(400).send({
      success: 'false',
      message: 'Did not receive an email address for new user',
      user: {}
    });
  }

  let newUser = {
    id: dbUsers.length, // length is indexed from 1,
    email: email
  };
  dbUsers.push(newUser);

  return res.status(201).send({
    success: 'true',
    message: 'Created new user',
    user: newUser
  });
});

// Define value to return for PATCH single user
// PUT would be handled the same but is defined as replacing the existing record vs altering.
app.patch('/api/users/:userId', (req, res) => {
  let userId = req.params.userId - 1; // shift 1 to left to match 0 based index

  // Verify user is valid
  if (!dbUsers[userId]) {
    return res.status(404).send({
      success: 'false',
      message: `user with id ${userId + 1} does not exist`, // shift 1 to right to match original request
      user: {}
    });
  }

  // Verify data payload is valid
  let email = req.body.email;
  if (!email) {
    return res.status(400).send({
      success: 'false',
      message: 'Did not receive an email address for user',
      user: {}
    });
  }

  dbUsers[userId].email = email;

  return res.status(200).send({
    success: 'true',
    message: 'Updated user successfully',
    user: dbUsers[userId]
  });
});

// DELETE a single user
app.delete('/api/users/:userId', (req, res) => {
  let userId = req.params.userId - 1; // shift 1 to left to match 0 based index

  // Verify user is valid
  if (!dbUsers[userId]) {
    return res.status(404).send({
      success: 'false',
      message: `user with id ${userId + 1} does not exist`, // shift 1 to right to match original request
      user: {}
    });
  }

  dbUsers.splice(userId, 1);  // Remove 1 entry starting at userId position

  return res.status(200).send({
    success: 'true',
    message: `Successfully deleted user ${userId + 1}`, // shift 1 to right to match original request
    user: {}
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

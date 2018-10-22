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
  })
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

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

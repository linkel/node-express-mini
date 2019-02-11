const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Go to /api/users to grab that sweet user info.');
});

server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({error: "The users information could not be retrieved."})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
  .then(user => {
    if (user.length < 1) {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    } else {
      res.status(200).json({user})
    }
  })
  .catch(err => {
    res.status(500).json({error: "The user information could not be retrieved."})
  })
})

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));
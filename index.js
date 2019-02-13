const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors())

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
    if (!user || user.length < 1) {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    } else {
      res.status(200).json({user})
    }
  })
  .catch(err => {
    res.status(500).json({error: "The user information could not be retrieved."})
  })
})

server.post('/api/users', (req, res) => {
  const body = req.body
  if (!body.name || !body.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.insert(body)
    .then(idObj => {
      db.findById(idObj.id)
      .then(user => {
        console.log(user)
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
      })
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
  }
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
  .then(user => {
    if (user.length < 1) {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    } else {
      db.remove(id)
      .then(response => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json({error: "The user could not be removed."})
      })
      res.status(200).json({user})
    }
  })
  .catch(err => {
    res.status(500).json({error: "The user could not be removed."})
  })
})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!body.name || !body.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.findById(id)
    .then(user => {
      console.log(user)
      if (!user || user.length < 1) {
        res.status(404).json({message: "The user with the specified ID does not exist."})
      } else {
        db.update(id, body)
        .then(response => {
          db.findById(id)
          .then(updatedUser => {
            res.status(200).json(updatedUser)
          })
          .catch(err => {
            res.status(500).json({error: "User was not found after update."})
          })
        })
        .catch(err => {
          res.status(500).json({error: "The user could not be removed."})
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The user information could not be modified." })
    })
  }
})

server.listen(8000, () => console.log('API running on port 8000'));
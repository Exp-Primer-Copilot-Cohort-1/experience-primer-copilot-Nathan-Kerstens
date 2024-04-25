// Create web server and listen on port 3000
// Using Express to handle HTTP requests
// Using Mongoose to handle MongoDB operations

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a new comment
app.post('/comment', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(comment);
    }
  });
});

// Get all comments
app.get('/comment', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comments);
    }
  });
});

// Get a comment by id
app.get('/comment/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});

// Update a comment by id
app.put('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});

// Delete a comment by id
app.delete('/comment/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export app for testing
module.exports = app;


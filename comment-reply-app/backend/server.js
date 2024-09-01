// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/commentreplyapp', {
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const commentSchema = new mongoose.Schema({
    text: String,
    username: String,
    
    replies: [{ text: String, username: String }]
  });
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  app.post('/api/login', (req, res) => {
    // This would be replaced with real authentication logic
    res.sendStatus(200);
  });
  
  app.get('/api/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
  });
  
  app.post('/api/comments', async (req, res) => {
    const { text, username } = req.body;
    const comment = new Comment({ text, username, replies: [] });
    await comment.save();
    res.sendStatus(200);
  });
  
  app.post('/api/comments/:id/replies', async (req, res) => {
    const { id } = req.params;
    const { text, username } = req.body;
    await Comment.findByIdAndUpdate(id, {
      $push: { replies: { text, username } }
    });
    res.sendStatus(200);
  });
  
  app.listen(5200, () => {
    console.log('Server is running on port 5200');
  });

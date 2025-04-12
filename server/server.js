// Import required modules
/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./models/postmodel'); // ✅ Import your Post model
const multer = require('multer');
const path = require('path');


// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// MongoDB connection URL
const MONGO_URI = 'mongodb://localhost:27017/herbuddy';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB successfully!');
});

app.use('/uploads', express.static('uploads')); // This serves uploaded files

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });


// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to HerBuddy API!');
});

// ✅ Create a new post
app.post('/api/posts/media', upload.single('media'), async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      media: req.file ? `/uploads/${req.file.filename}` : null
    });
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Fetch all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ✅ Like a post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ✅ Comment on a post
app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { comment } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./models/postmodel'); // ✅ Import your Post model
const multer = require('multer');
const path = require('path');
const Doubt = require('./models/doubtmodel');


// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection URL
const MONGO_URI = 'mongodb://localhost:27017/herbuddy';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB successfully!');
});

app.use('/uploads', express.static('uploads')); // This serves uploaded files

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to HerBuddy API!');
});

// ✅ Create a new post with username
/*app.post('/api/posts/media', upload.single('media'), async (req, res) => {
  try {
    const post = new Post({
      username: req.body.username || "Anonymous",  // 👈 store username
      content: req.body.content,
      media: req.file ? `/uploads/${req.file.filename}` : null
    });
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/
// ✅ Submit a doubt to mentor
app.post('/api/doubts', async (req, res) => {
  try {
    const { doubt, user } = req.body;

    if (!doubt || !user) {
      return res.status(400).json({ error: 'Doubt or user missing' });
    }

    const newDoubt = new Doubt({ doubt, user });
    await newDoubt.save();

    res.status(200).json({ message: 'Doubt submitted successfully!' });
  } catch (err) {
    console.error('❌ Error submitting doubt:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// ✅ Fetch all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ✅ Like a post
/*app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
*/
// ✅ Create a new post with username
app.post('/api/posts/media', upload.single('media'), async (req, res) => {
  try {
    const post = new Post({
      username: req.body.username || "Anonymous",  // 👈 store username
      content: req.body.content,
      media: req.file ? `/uploads/${req.file.filename}` : null
    });
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Comment on a post
app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { comment } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});




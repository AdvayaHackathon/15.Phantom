// models/postmodel.js
/*const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
  content: String,
  media: {
    type: String,
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [String]
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt

module.exports = mongoose.model('Post', postSchema);
*/
// models/postmodel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Anonymous" // fallback if no username is provided
  },
  content: String,
  media: {
    type: String,
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [String]
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt

module.exports = mongoose.model('Post', postSchema);

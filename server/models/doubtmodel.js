const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  user: { type: String, default: 'Anonymous' },
  doubt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doubt', doubtSchema);

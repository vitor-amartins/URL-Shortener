const mongoose = require('mongoose');

const { Schema } = mongoose;

const linkSchema = new Schema({
  url: {
    type: String, required: true, trim: true,
  },
  clicks: {
    type: Number, required: true, default: 0,
  },
  short: {
    type: String, required: true, trim: true, unique: true,
  },
}, {
  timestamps: true,
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;

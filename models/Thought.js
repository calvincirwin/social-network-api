const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Import Reaction schema

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema], // ✅ Stores multiple reactions
}, { timestamps: true });

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;

const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// TODO: Schema
// username
// String
// Unique
// Required
// Trimmed

// email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)

// thoughts
// Array of _id values referencing the Thought model

// friends
// Array of _id values referencing the User model (self-reference)

// TODO: Virtual
// friendCount that retrieves length of users friends array field on query

const User = model('user', userSchema);

module.exports = User;

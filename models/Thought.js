const { Schema, model } = require('mongoose');

// TODO: Schema
// thoughtText
// String
// Required
// Must be between 1 and 280 characters

// createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

// username (The user that created this thought)
// String
// Required

// reactions (These are like replies)
// Array of nested documents created with the reactionSchema

// TODO: Virtual
// reactionCount that retrieves length of thought's reactions array field on query

const Thought = model('thought', thoughtSchema);

module.exports = thoughtSchema;

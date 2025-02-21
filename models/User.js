const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Must match a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought', // ✅ This references the Thought model
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // ✅ This references the User model (self-reference)
    }
  ],
}, {
  toJSON: { virtuals: true },
  id: false,
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

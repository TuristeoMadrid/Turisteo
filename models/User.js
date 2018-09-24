const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
require('mongoose-type-email');

const userSchema = new Schema({
  username: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  profilePic: String,
  role: {type: String, enum:['user', 'creator']}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

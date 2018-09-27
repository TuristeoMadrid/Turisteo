const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const userSchema = new Schema({
  username: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  admin: {type: Boolean, default: true},
  creator: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  confirmationCode: { type: String, unique: true}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;

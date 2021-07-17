const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      default: mongoose.Types.ObjectId('60ef3eb7b4a73adfb5781dda'),
    },
  },
  {
    timestamps: true,
  },
);

const saltRounds = 12;

UserSchema.methods.hashPassword = async (password) => bcrypt.hashSync(password, saltRounds);

UserSchema.methods
  .compareUserPassword = async (inputPass, hashedPass) => bcrypt.compare(inputPass, hashedPass);

UserSchema.methods
  .generateJwtToken = async (payload, secret, expires) => jwt.sign(payload, secret, expires);

// Export model
module.exports = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use',
});

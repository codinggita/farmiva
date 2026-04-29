const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    accountType: {
      type: String,
      enum: ['customer', 'farmer', 'admin'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

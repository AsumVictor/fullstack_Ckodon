const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  residence: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "undergraduate",
  },
  school: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: false,
  },
  gender:{
    type: String,
    required: true,
  }
},
{
    timestamps:true,
});

module.exports = mongoose.model("User", userSchema);

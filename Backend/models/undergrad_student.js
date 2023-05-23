const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    gender: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      required: false,
    },
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],

    keyInterest: [
      {
        text: { type: String, required: false },
      },
    ],
    bio: {
      type: String,
      required: false,
    },
    intendedMajor: [
      {
        text: { type: String, required: false },
      },
    ],

    updatedStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

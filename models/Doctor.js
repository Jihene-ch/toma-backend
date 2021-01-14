const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true,
    min: 2,
    max: 255
  },
  Description: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  Domain: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  Location: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Doctor", DoctorSchema);
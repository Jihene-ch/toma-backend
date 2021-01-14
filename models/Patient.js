const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true,
    min: 2,
    max: 255
  },
  Age: {
    type: String,
    required: true,
    lowercase: true,
    min: 1,
    max: 3
  },
  Description: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  IsArchived: {
    type: Boolean,
    required: true,
    default: false
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Patient", PatientSchema);
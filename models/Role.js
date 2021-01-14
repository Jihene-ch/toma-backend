const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  _userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  ],
  _apps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "App"
    }
  ],
  name: {
    type: String,
    lowercase: true,
    enum: ["patient", "doctor"],
    default: "patient"
  }
});

module.exports = mongoose.model("Role", roleSchema);

const mongoose = require("mongoose");

const MyAppointmentSchema = new mongoose.Schema({
UserID: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  unique:false,
  ref: "User"
},
DoctorID: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "Doctor"
},
Date: {
    type: Date,
    default:Date.now
},
Status: {
    type: String,
    lowercase: true,
    enum: ["confirmed", "waiting"],
    default: "waiting"
}
});

module.exports = mongoose.model("MyAppointment", MyAppointmentSchema);
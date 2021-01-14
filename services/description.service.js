const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const User = require("../models/User");

class DescriptionService {
  async getPatients() {
    return Patient.find({IsArchived: false}).populate({ path: 'Patient', model: Patient });
  }

  async getAllDoctors() {
    return Intern.find().populate({ path: 'Doctor', model: Doctor });
  }

  async filterPatients(filterData) {
    let validFilters = {};

    if(filterData.HideArchived == true)
      validFilters.IsArchived = false;

    if(filterData.Name)
      validFilters.Name = {$regex: new RegExp(filterData.Name, "i")}
    
    if(filterData.Age)
    validFilters.Age = {$regex: new RegExp(filterData.Age, "i")}

    if(filterData.Domain)
      validFilters.Domain = filterData.Domain;

    if(filterData.Location)
      validFilters.Location = filterData.Location;


    return Patient.find(validFilters).populate({ path: 'Patient', model: Patient });
  }


  async filterDoctors(filterData) {

    if(filterData.Name)
      Name = {$regex: new RegExp(filterData.Name, "i")}

    if(filterData.Domain)
      Domain = filterData.Domain;

    if(filterData.Location)
      Location = filterData.Location;


    return Doctor.find().populate({ path: 'Doctor', model: Doctor });
  }

  async createPatientDescription(patientData) {
    patientData.Patient = mongoose.Types.ObjectId(patientData.Patient._id);
    patientData.IsArchived = false;
    const description = new Description(patientData);
    return description.save();
  }

  async createDoctorDescription(doctorData) {
    doctorData.Doctor = mongoose.Types.ObjectId(doctorData.Doctor._id);
    const drDescription = new Description(doctorData);
    return drDescription.save();
  }

  async updatePatient(id, patientData) {
    if (patientData.User)
      patientData.User = mongoose.Types.ObjectId(patientData.User._id);

    patientData.IsArchived = false;
    return Patient.update({ _id: id }, patientData, { multi: true });
  }
  async updateDoctor(id, doctorData) {
    if (doctorData.User)
      doctorData.User = mongoose.Types.ObjectId(doctorData.User._id);

    return Doctor.update({ _id: id }, doctorData, { multi: true });
  }
  async archivePatient(id) {
    return Patient.update({ _id: id }, {IsArchived: true}, { multi: true });
  }

  async restorePatient(id) {
    return Patient.update({ _id: id }, {IsArchived: false}, { multi: true });
  }

  async starDoctor(userId, doctorId) {
    let user = await User.findOne({_id: userId});
    if(!user.starredDoctors)
      user.starredDoctors = [doctorId];
    else {
      let i = user.starredDoctors.indexOf(doctorId);
      if(i != -1)
        user.starredDoctors.splice(i,1);
      else
        user.starredDoctors.push(doctorId);
    }
    return user.save();
  }

  async getStarredDoctors(userId) {
    let user = await User.findOne({_id: userId});
    if(user.starredDoctors)
      return user.starredDoctors;
    return [];
  }
}

module.exports = new DescriptionService();

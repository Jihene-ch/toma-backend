const Router = require("express").Router;
const descriptionService = require("../../services/description.service");

// const { verifyToken } = require("../../helpers/verifyToken");

const router = Router({
  mergeParams: true
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await descriptionService.getPatients();
    res.send(patients);
  }
  catch (e) {
    console.log(e);
    res.json({ error: "Failed to get patients"});
  }
});

router.get("/doctors/all", async (req, res) => {
  try {
    const doctors = await descriptionService.getAllDoctors();
    res.send(doctors);
  }
  catch (e) {
    console.log(e);
    res.json({ error: "Failed to get doctors"});
  }
});

router.get("/doctors/starred", async (req, res) => {
  try {
    let userId = ""; // add a constant value for testing
    const doctors = await descriptionService.getStarredDoctors(userId);
    res.send(doctors);
  }
  catch (e) {
    console.log(e);
    res.json({ error: "Failed to get starred doctors"});
  }
});


router.post("/doctors/filter", async (req, res) => {
  try {
    const doctor = await descriptionService.filterDoctors(req.body);
    res.send(doctor);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});

router.post("/patients/filter", async (req, res) => {
  try {
    const patient = await descriptionService.filterPatients(req.body);
    res.send(patient);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});


router.patch("/patients/:id/", async (req, res) => {
  try {
    const patient = await descriptionService.updatePatient(req.params.id, req.body);
    res.send(patient);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});

router.patch("/doctors/:id/", async (req, res) => {
  try {
    const doctor = await descriptionService.updateDoctor(req.params.id, req.body);
    res.send(doctor);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});

router.post("/doctors/:id/star", async (req, res) => {
  try {
    let userId = ""; // add constant value for testing
    await descriptionService.starDoctor(userId, req.params.id);
    res.send({success: true});
  }
  catch (e) {
    res.json({ error: e.message});
  }
});

router.patch("/patients/:id/archive", async (req, res) => {
  try {
    const patient = await descriptionService.archivePatient(req.params.id);
    res.send(patient);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});

router.patch("/patients/:id/restore", async (req, res) => {
  try {
    const patient = await descriptionService.restorePatient(req.params.id);
    res.send(patient);
  }
  catch (e) {
    res.json({ error: e.message});
  }
});



module.exports = router;

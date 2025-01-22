const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

// Get all doctors
const getalldoctors = async (req, res) => {
  try {
    const query = { isDoctor: true };
    if (req.locals) {
      query._id = { $ne: req.locals };
    }

    const docs = await Doctor.find(query).populate("userId");
    return res.send(docs);
  } catch (error) {
    console.error("Error fetching doctors: ", error);
    res.status(500).send("Unable to get doctors");
  }
};

// Get all non-doctors
const getnotdoctors = async (req, res) => {
  try {
    const query = { isDoctor: false };
    if (req.locals) {
      query._id = { $ne: req.locals };
    }

    const docs = await Doctor.find(query).populate("userId");
    return res.send(docs);
  } catch (error) {
    console.error("Error fetching non-doctors: ", error);
    res.status(500).send("Unable to get non-doctors");
  }
};

// Apply for a doctor role
const applyfordoctor = async (req, res) => {
  try {
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const doctor = new Doctor({ ...req.body.formDetails, userId: req.locals });
    const result = await doctor.save();

    console.log("Doctor application submitted: ", result);
    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    console.error("Error submitting application: ", error);
    res.status(500).send("Unable to submit application");
  }
};

// Accept doctor application
const acceptdoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { isDoctor: true }
    );

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    const notification = new Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });
    await notification.save();

    console.log(`Doctor application accepted for user: ${req.body.id}`);
    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    console.error("Error accepting doctor application: ", error);
    res.status(500).send("Error while sending notification");
  }
};

// Reject doctor application
const rejectdoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    if (!delDoc) {
      return res.status(404).send("Doctor application not found");
    }

    const notification = new Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });
    await notification.save();

    console.log(`Doctor application rejected for user: ${req.body.id}`);
    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    console.error("Error rejecting doctor application: ", error);
    res.status(500).send("Error while rejecting application");
  }
};

// Delete a doctor
const deletedoctor = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {
      isDoctor: false,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const removeDoc = await Doctor.findOneAndDelete({ userId: req.body.userId });

    if (!removeDoc) {
      return res.status(404).send("Doctor not found");
    }

    const removeAppoint = await Appointment.deleteMany({
      userId: req.body.userId,
    });

    console.log(
      `Doctor deleted: ${req.body.userId}, Appointments deleted: ${removeAppoint.deletedCount}`
    );
    return res.status(200).send("Doctor deleted successfully");
  } catch (error) {
    console.error("Error deleting doctor: ", error);
    res.status(500).send("Unable to delete doctor");
  }
};

module.exports = {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
};

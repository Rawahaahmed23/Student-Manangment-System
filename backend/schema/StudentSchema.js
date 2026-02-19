const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    GrNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    StudentName: {
      type: String,
      required: true,
      trim: true,
    },

    FatherName: {
      type: String,
      required: true,
      trim: true,
    },

    Class: {
      type: String,
      required: true,
    },

    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    DateOfBirth: {
      type: Date,
      required: true,
    },

    DateOfAdmission: {
      type: Date,
      default: Date.now,
    },

    MonthlyFee: {
      type: Number,
      required: true,
    },

    FeeStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },

    LastFeeUpdate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const student=  mongoose.model("Student", studentSchema);
module.exports = student

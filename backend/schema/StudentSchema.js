const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    GrNumber: {
      type: Number,
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

    // 🔥 NEW FIELDS
    paidMonths: {
      type: [String],
      default: [],
    },

    totalMonths: {
      type: [String],
      default: [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ],
    },

    LastFeeUpdate: {
      type: Date,
    },

    profileImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
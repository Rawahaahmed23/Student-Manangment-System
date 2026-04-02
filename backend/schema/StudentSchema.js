const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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



 


  feeStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
 feeRecords: [
    {
      year: Number,
      paidMonths: [String],
    }
  ],
  LastFeeUpdate: {
    type: Date,
  },
nextDueDate:{
type:Date
},


}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
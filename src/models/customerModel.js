const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    DOB: { type: Date.new() },
    emailID: { type: String, unique: true, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);

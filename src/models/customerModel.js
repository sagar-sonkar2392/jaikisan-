const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    DOB: { type: String },
    emailID: { type: String, required: true, unique: true,  trim: true },
    address: { type: String, required: true, trim: true },
    customerId:{type:String, required: true, trim: true},
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
      trim: true,
    },
    isDeleted:{type:Boolean,default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);

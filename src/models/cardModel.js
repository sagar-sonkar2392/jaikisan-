const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: Number, default:0, required: true, trim: true },
    cardType: {
      type: String,
      required: true,
      enum: ["REGULAR", "SPECIAL"],
      trim: true,
    },
    customerName: { type: String, trim: true, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      trim: true,
    },
    vision: { type: String, trim: true },
    customerID: { type: ObjectId, ref:"customer", required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);

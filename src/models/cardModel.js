const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: string, required: true, trim: true },
    cardType: {
      type: String,
      required: ture,
      enum: ["REGULAR", "SPECIAL"],
      trim: true,
    },
    customerName: { type: string, trim: true, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
      trim: true,
    },
    vision: { type: String, required: true, trim: true },
    customerID: { type: ObjectId, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);

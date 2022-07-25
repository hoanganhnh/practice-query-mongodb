const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    activated: Boolean,
    idVerified: Boolean,
    lockoutEnabled: Boolean,
    accessFailedCount: Number,
    password: String,
    email: String,
    clubs: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },

    onboarded: Boolean,
    tocAccepted: Boolean,
    roles: [],
    isDeleted: Boolean,
    picture: String,
    affiliated: String,
    affiliatedWithTheClubBy: String,
    wantToReceiveUpdates: Boolean,
  },
  {
    collection: "users",
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

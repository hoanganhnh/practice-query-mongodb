const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const club_private_signup_linkSchema = new Schema(
  {
    blacklisted: Boolean,
    uuid: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },
    expiry_date: String,
  },
  {
    collection: "club_private_signup_links",
  }
);

module.exports = club_private_signup_linkSchema;

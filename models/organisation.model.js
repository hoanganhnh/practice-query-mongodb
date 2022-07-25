const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organisationSchema = new Schema(
  {
    name: String,
    conferences: [
      {
        type: Schema.Types.ObjectId,
        ref: "conference",
      },
    ],
    competitions: [
      {
        type: Schema.Types.ObjectId,
        ref: "competition",
      },
    ],
    clubs: [
      {
        type: Schema.Types.ObjectId,
        ref: "club",
      },
    ],
    createdBy: String,
  },
  {
    collection: "organisations",
  }
);

const organisationModel = mongoose.model("organisation", organisationSchema);

module.exports = organisationModel;

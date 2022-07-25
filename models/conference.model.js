const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema(
  {
    name: String,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
  },
  {
    collection: "conferences",
  }
);

const conferenceModel = mongoose.model("conference", conferenceSchema);

module.exports = conferenceModel;

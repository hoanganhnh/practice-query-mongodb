const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fixtureSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    fixtureDate: Date,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
    teamOne: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamOneGameSubmission: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamTwo: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamTwoGameSubmission: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    collection: "fixtures",
  }
);

const fixtureModel = mongoose.model("fixture", fixtureSchema);

module.exports = fixtureModel;

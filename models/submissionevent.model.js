const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionEventSchema = new Schema(
  {
    action: String,
    time: String,
    players: [],
    submission: {
      type: Schema.Types.ObjectId,
      ref: "submission",
    },
  },
  {
    collection: "submissionevents",
  }
);

const submissionnEventModel = mongoose.model(
  "submissionevent",
  submissionEventSchema
);

module.exports = submissionnEventModel;

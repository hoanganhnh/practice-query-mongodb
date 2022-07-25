const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seasonSchema = new Schema(
  {
    name: String,
    year: Number,
    competitionCategory: {
      type: Schema.Types.ObjectId,
      ref: "competitionCategory",
    },
    seasonGroups: {
      type: String,
      default: null,
    },
  },
  {
    collection: "seasons",
  }
);

const seasonModel = mongoose.model("season", seasonSchema);

module.exports = seasonModel;

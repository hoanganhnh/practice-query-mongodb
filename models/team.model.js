const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    domain: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },
    defaultRoster: [
      {
        type: String,
        ref: "defaultrostermember",
      },
    ],
    seasons: [
      {
        type: Schema.Types.ObjectId,
        ref: "season",
      },
    ],
    competition: [
      {
        type: Schema.Types.ObjectId,
        ref: "competition",
      },
    ],
  },
  {
    collection: "teams",
  }
);

const teamModel = mongoose.model("team", teamSchema);

module.exports = teamModel;

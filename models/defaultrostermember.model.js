const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const defaultrostermemberSchema = new Schema(
  {
    isDeleted: Boolean,
    player: {
      type: Schema.Types.ObjectId,
      ref: "player",
    },
    squadNumber: String,
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    collection: "defaultrostermembers",
  }
);

const defaultrostermemberModel = mongoose.model(
  "defaultrostermember",
  defaultrostermemberSchema
);

module.export = defaultrostermemberModel;

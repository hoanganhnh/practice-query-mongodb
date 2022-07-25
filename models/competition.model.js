const mongoose = require("mongoose");

const competitioncategorieModel = require("./competitioncategory.model");

const Schema = mongoose.Schema;

const competitionSchema = new Schema(
  {
    name: String,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
    conferences: [
      {
        type: Schema.Types.ObjectId,
        ref: "conference",
      },
    ],
    competitionCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: competitioncategorieModel,
      },
    ],
  },
  {
    collection: "competitions",
  }
);

const competitionModel = mongoose.model("competition", competitionSchema);

module.exports = competitionModel;

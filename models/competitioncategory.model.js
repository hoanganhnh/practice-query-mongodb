const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const competitioncategorySchema = new Schema(
  {
    name: String,
    competition: {
      type: Schema.Types.ObjectId,
      ref: "competition",
    },
    seasons: [{ type: Schema.Types.ObjectId, ref: "season" }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    collection: "competitioncategories",
  }
);

const competitioncategorieModel = mongoose.model(
  "competitioncategorie",
  competitioncategorySchema
);

module.exports = competitioncategorieModel;

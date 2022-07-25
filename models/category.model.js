const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: String,
  },
  {
    collection: "categories",
  }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;

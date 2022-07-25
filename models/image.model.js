const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    imageSchema: String,
    mimetype: String,
    signedUrl: String,
    src: String,
    createdBy: String,
  },
  {
    collection: "images",
  }
);

const imageModel = mongoose.model("image", imageSchema);

module.exports = imageModel;

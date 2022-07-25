const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    status: String,
    filename: String,
    extension: String,
    processing_initiated_at: String,
    processing_completed_at: String,
  },
  {
    collection: "videos",
  }
);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;

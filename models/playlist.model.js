const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    clips: [],
    created_by: String,
    playlist_initiated_at: String,
  },
  {
    collection: "playlists",
  }
);

const playlistModel = mongoose.model("playlist", playlistSchema);

module.exports = playlistModel;

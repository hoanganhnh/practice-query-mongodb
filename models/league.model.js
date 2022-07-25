const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leagueSchema = new Schema(
  { leagueSchema: String },
  {
    collection: "leagues",
  }
);

const leagueModel = mongoose.model("league", leagueSchema);

module.exports = leagueModel;

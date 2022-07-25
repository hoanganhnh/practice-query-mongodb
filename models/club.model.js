const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: String,
    logo: String,
    conferences: [
      {
        type: Schema.Types.ObjectId,
        ref: "conference",
      },
    ],
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
    ],
    organisations: [
      {
        type: Schema.Types.ObjectId,
        ref: "organisation",
      },
    ],
    homeColor: String,
    awayColor: String,
    homeVenueName: String,
    createdBy: String,
  },
  {
    collection: "clubs",
  }
);

const clubModel = mongoose.model("club", clubSchema);

module.exports = clubModel;

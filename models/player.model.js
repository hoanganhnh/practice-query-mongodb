const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    clubs: {
      type: Array,
    },
    isDeleted: Boolean,
    firstName: String,
    lastName: String,
    dob: Date,
    createdBy: String,
    academicScores: {
      GPA: {
        score: String,
        show: Boolean,
      },
      PSAT: {
        score: String,
        show: Boolean,
      },
      SAT: {
        score: String,
        show: Boolean,
      },
      ACT: {
        score: String,
        show: Boolean,
      },
    },
    graduationYear: {
      year: String,
      show: Boolean,
    },
    nationalities: [
      {
        name: String,
        flag: String,
      },
    ],
    picture: String,
    position: String,
    socials: {
      twitter: {
        show: Boolean,
        url: String,
      },
      facebook: {
        show: Boolean,
        url: String,
      },
      tiktok: {
        show: Boolean,
        url: String,
      },
      instagram: {
        show: Boolean,
        url: String,
      },
    },
    squadNumber: String,
    teams: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    bio: String,
  },
  {
    collection: "players",
  }
);

const playerModel = mongoose.model("player", playerSchema);

module.exports = playerModel;

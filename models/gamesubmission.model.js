const mongoose = require("mongoose");

const categoryModel = require("./category.model");
const competitionModel = require("./competition.model");
const organisationModel = require("./organisation.model");
const teamModel = require("./team.model");
const fixtureModel = require("./fixture.model");

const Schema = mongoose.Schema;

const gamesubmissionSchema = new Schema(
  {
    dataSubmission: {
      status: {
        type: Number,
      },
      flagReason: {
        type: String,
        default: null,
      },
    },
    video: {
      videoId: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
      status: {
        type: Number,
      },
      flagReason: {
        type: String,
        default: null,
      },
    },
    dataAnalysisStatus: Number,
    gameEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "submissionevent",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: organisationModel,
    },
    competition: {
      type: Schema.Types.ObjectId,
      ref: competitionModel,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: categoryModel,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: teamModel,
    },
    team1club: {
      type: Schema.Types.ObjectId,
      ref: teamModel,
    },
    team2club: {
      type: Schema.Types.ObjectId,
      ref: teamModel,
    },
    opponent: {
      type: Schema.Types.ObjectId,
      ref: "opponent",
    },
    gameDate: Date,
    timezone: String,
    fixtureId: {
      type: Schema.Types.ObjectId,
      ref: fixtureModel,
    },
    createdAt: Date,
  },
  {
    collection: "gamesubmissions",
  }
);

const gamesubmissionModel = mongoose.model(
  "gamesubmission",
  gamesubmissionSchema
);

module.exports = gamesubmissionModel;

import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import connect from "./db.js";

const Schema = mongoose.Schema;

// init app & middleware
const app = express();

// db connection
let db;

const PORT = 5000;

app.use(express.json());

connect();

const categorySchema = new Schema(
  {
    name: String,
  },
  {
    collection: "categories",
  }
);
const club_private_signup_linkSchema = new Schema(
  {
    blacklisted: Boolean,
    uuid: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },
    expiry_date: String,
  },
  {
    collection: "club_private_signup_links",
  }
);
const clubSchema = new Schema(
  {
    name: String,
    logo: String,
    conferences: [],
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
    ],
    organisations: [],
    homeColor: String,
    awayColor: String,
    homeVenueName: String,
    createdBy: String,
  },
  {
    collection: "clubs",
  }
);
const competitioncategorySchema = new Schema(
  {
    name: String,
    competition: {
      type: Schema.Types.ObjectId,
      ref: "competition",
    },
    seasons: [],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    collection: "competitioncategories",
  }
);
const competitionSchema = new Schema(
  {
    name: String,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
    conferences: [],
    competitionCategories: [],
  },
  {
    collection: "competitions",
  }
);
const conferenceSchema = new Schema(
  {
    name: String,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
  },
  {
    collection: "conferences",
  }
);
const defaultrostermemberSchema = new Schema(
  {
    isDeleted: Boolean,
    player: {
      type: Schema.Types.ObjectId,
      ref: "player",
    },
    squadNumber: String,
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    collection: "defaultrostermembers",
  }
);
const fixtureSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    fixtureDate: Date,
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
    teamOne: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamOneGameSubmission: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamTwo: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    teamTwoGameSubmission: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    collection: "fixtures",
  }
);
const gamesubmissionSchema = new Schema(
  {
    dataSubmission: {},
    video: {},
    gameEvents: [],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "organisation",
    },
    competition: {
      type: Schema.Types.ObjectId,
      ref: "competition",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    team1club: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    team2club: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    opponent: {
      type: Schema.Types.ObjectId,
      ref: "opponent",
    },
    gameDate: Date,
    timezone: String,
    fixtureId: {
      type: Schema.Types.ObjectId,
      ref: "fixture",
    },
  },
  {
    collection: "gamesubmissions",
  }
);
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
const leagueSchema = new Schema(
  { leagueSchema: String },
  {
    collection: "leagues",
  }
);
const organisationSchema = new Schema(
  {
    name: String,
    conferences: [],
    competitions: [],
    clubs: [],
    createdBy: String,
  },
  {
    collection: "organisations",
  }
);
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
const seasonSchema = new Schema(
  {
    name: String,
    year: Number,
    competitionCategory: {
      type: Schema.Types.ObjectId,
      ref: "competitionCategory",
    },
    // seasonGroups: Null
  },
  {
    collection: "seasons",
  }
);
const submissioneventSchema = new Schema(
  {
    action: String,
    time: String,
    players: [],
    submission: {
      type: Schema.Types.ObjectId,
      ref: "submission",
    },
  },
  {
    collection: "submissionevents",
  }
);
const teamSchema = new Schema(
  {
    domain: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    club: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },
    defaultRoster: [
      {
        type: String,
        ref: "defaultrostermember"
      }
    ],
    competition: [],
  },
  {
    collection: "teams",
  }
);
const user_signup_valid_email_domainSchema = new Schema(
  {
    processing_completed_at: String,
    domain: String,
  },
  {
    collection: "user_signup_valid_email_domains",
  }
);
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    activated: Boolean,
    idVerified: Boolean,
    lockoutEnabled: Boolean,
    accessFailedCount: Number,
    password: String,
    email: String,
    clubs: {
      type: Schema.Types.ObjectId,
      ref: "club",
    },

    onboarded: Boolean,
    tocAccepted: Boolean,
    roles: [],
    isDeleted: Boolean,
    picture: String,
    affiliated: String,
    affiliatedWithTheClubBy: String,
    wantToReceiveUpdates: Boolean,
  },
  {
    collection: "users",
  }
);
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

const categoryModel = mongoose.model("category", categorySchema);
const club_private_signup_linkModel = mongoose.model(
  "club_private_signup_link",
  club_private_signup_linkSchema
);
const clubModel = mongoose.model("club", clubSchema);
const competitioncategorieModel = mongoose.model(
  "competitioncategorie",
  competitioncategorySchema
);
const competitionModel = mongoose.model("competition", competitionSchema);
const conferenceModel = mongoose.model("conference", conferenceSchema);
const defaultrostermemberModel = mongoose.model(
  "defaultrostermember",
  defaultrostermemberSchema
);
const fixtureModel = mongoose.model("fixture", fixtureSchema);
const gamesubmissionModel = mongoose.model(
  "gamesubmission",
  gamesubmissionSchema
);
const imageModel = mongoose.model("image", imageSchema);
const leagueModel = mongoose.model("league", leagueSchema);
const organisationModel = mongoose.model("organisation", organisationSchema);
const playerModel = mongoose.model("player", playerSchema);
const playlistModel = mongoose.model("playlist", playlistSchema);
const seasonModel = mongoose.model("season", seasonSchema);
const submissionneventModel = mongoose.model(
  "submissionevent",
  submissioneventSchema
);
const teamModel = mongoose.model("team", teamSchema);
const user_sugnup_valid_email_domainModel = mongoose.model(
  "user_sugnup_valid_email_domain",
  user_signup_valid_email_domainSchema
);
const userModel = mongoose.model("user", userSchema);
const videoModel = mongoose.model("video", videoSchema);

// userModel.find()
// .then(data => {
//   console.log(data);
// })
// .catch(err => {
//   console.log("Fail");
// })

// routes
// app.get("/", async (req, res) => {
//   const collection = mongoose.connection.db.collection("players");

//   const users = await collection
//     .aggregate([
//       {
//         $match: {
//           firstName: "Thien",
//           lastName: "Dang",
//         },
//       },
//     ])
//     .toArray();

//   res.status(200).json({
//     results: users.length,
//     data: users,
//   });
// });

app.get("/q1/filterStatus", async (req, res) => {
  await videoModel
    .find({ status: { $eq: "pendingUpload" } }, {"status": 1})
    .then((data) => {
      res.json({ result: data.length, data });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});

app.get("/test/getUser", async (req, res) => {
  await userModel
    .find()
    .populate({
      path: "clubs",
      populate: {
        path: "teams",
        populate: {
          path: "club",
          populate: {
            path: "teams",
            populate: {
              path: "defaultRoster"
            }
          }
        },
      },
    })
    .then((data) => {
      res.json({ result: data.length, data });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});
// app.get("/test/unknownTest", async (req, res) => {
//   const result = await gamesubmissionSchema.findOne({ _id: gameSubmissionId })
//   .populate({
//     path: 'user',
//     populate: {
//       path: 'clubs',
//       select: 'logo homeColor awayColor homeVenueName name',
//     },
//   })
//   .populate({ path: 'organisation', select: 'name' })
//   .populate({
//     path: 'competition',
//     select: 'name',
//     populate: {
//       path: 'competitionCategories',
//       populate: { path: 'seasons', model: Seasons },
//     },
//   })
//   .populate({ path: 'category', select: 'name' })
//   .populate({
//     path: 'team',
//     select: 'name',
//     populate: {
//       path: 'defaultRoster',
//       select: 'players squadNumber',
//       populate: {
//         path: 'player',
//         select: 'firstName lastName',
//       },
//     },
//   })
//   .populate({
//     path: 'opponent',
//     select: 'name',
//     populate: { path: 'club', select: 'name' },
//   })
//   .populate({ path: 'fixtureId', model: Fixtures, select: '_id' })
//   .populate({
//     path: 'gameEvents',
//     model: SubmissionEvent,
//     populate: {
//       path: 'players.player',
//       model: Players,
//       select: 'firstName lastName',
//     },
//   });
// });

app.get("/q2/filterLastNameAndEmail", async (req, res) => {
  const collection = mongoose.connection.db.collection("users");

  const users = await collection
    .find({
      $and: [{ lastName: "Admin" }, { email: { $regex: /@test.com$/i } }],
    })
    .toArray();

  res.status(200).json({
    results: users.length,
    data: users,
  });
});
app.get("/q2/filterLastNameOrActivate", async (req, res) => {
  const collection = mongoose.connection.db.collection("users");

  const users = await collection
    .find({
      $or: [{ lastName: "Admin" }, { activated: false }],
    })
    .toArray();

  res.status(200).json({
    results: users.length,
    data: users,
  });
});
app.get("/q2/findByID/:id", async (req, res) => {
  const collection = mongoose.connection.db.collection("users");

  const users = await collection
    .find({
      _id: ObjectId(req.params.id),
    })
    .toArray();

  res.status(200).json({
    results: users.length,
    data: users,
  });
});

app.get("/q2/findByID/:id", async (req, res) => {
  const collection = mongoose.connection.db.collection("users");

  const users = await collection
    .find({})

    .toArray();

  res.status(200).json({
    results: users.length,
    data: users,
  });
});

app.listen(PORT, () => {
  console.log(`> Run on port http://localhost:${PORT}`);
});

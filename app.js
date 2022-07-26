const express = require("express");
const mongoose = require("mongoose");

const connect = require("./db");
const clubModel = require("./models/club.model");
const userModel = require("./models/user.model");
const videoModel = require("./models/video.model");
const gamesubmissionModel = require("./models/gamesubmission.model");
const seasonModel = require("./models/season.model");
const fixtureModel = require("./models/fixture.model");
const submissionnEventModel = require("./models/submissionevent.model");
const playerModel = require("./models/player.model");
const teamModel = require("./models/team.model");

const app = express();

const PORT = 5000;

app.use(express.json());

connect();

app.get("/q1/filterStatus", async (req, res) => {
  await videoModel
    .find({ status: { $eq: "pendingUpload" } }, { status: 1 })
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
              path: "defaultRoster",
            },
          },
        },
      },
    })
    .limit(2)
    .then((data) => {
      res.json({ result: data.length, data });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});
app.get("/api/gamesubmission/:gameSubmissionId", async (req, res) => {
  const { gameSubmissionId } = req.params;

  const gamesubmission = await gamesubmissionModel
    .findOne({ _id: gameSubmissionId })
    .populate({
      path: "user",
      populate: {
        path: "clubs",
        select: "logo homeColor awayColor homeVenueName name",
      },
    })
    .populate({ path: "organisation", select: "name" })
    .populate({
      path: "competition",
      select: "name",
      populate: {
        path: "competitionCategories",
        populate: { path: "seasons", model: seasonModel },
      },
    })
    .populate({ path: "category", select: "name" })
    .populate({
      path: "team",
      select: "name",
      populate: {
        path: "defaultRoster",
        select: "players squadNumber",
        populate: {
          path: "player",
          select: "firstName lastName",
        },
      },
    })
    // .populate({
    //   path: "opponent",
    //   select: "name",
    //   populate: { path: "club", select: "name" },
    // })
    .populate({ path: "fixtureId", model: fixtureModel, select: "_id" })
    .populate({
      path: "gameEvents",
      model: submissionnEventModel,
      populate: {
        path: "players.player",
        model: playerModel,
        select: "firstName lastName",
      },
    });

  res.status(200).json({
    data: gamesubmission,
  });
});

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
/**
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#lookup-multiple-joins
 */
app.get("/club_private_signup_links", async (req, res) => {
  const collection = mongoose.connection.db.collection(
    "club_private_signup_links"
  );

  const club_private_signup_links = await collection
    .aggregate([
      {
        $match: {
          uuid: "266be2f4-014f-4c77-becc-0f7f24f56f69",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { firstName: 1, lastName: 1 } }],
        },
      },
      {
        $lookup: {
          from: "clubs",
          localField: "club",
          foreignField: "_id",
          as: "club",
          pipeline: [{ $project: { name: 1 } }],
        },
      },
    ])
    .toArray();
  res.status(200).json({
    data: club_private_signup_links,
  });
});

app.get("/clubs", async (req, res) => {
  const clubs = await clubModel
    .find()
    .populate({
      path: "conferences",
      select: "name",
    })
    .populate({
      path: "teams",
      select: "name category seasons",
      populate: {
        path: "category",
        select: "name",
      },
      populate: {
        path: "seasons",
      },
    })
    .limit(2);

  res.status(200).json({
    result: clubs.length,
    data: clubs,
  });
});
// find age player gt 15
app.use("/age-player", async (req, res) => {
  const players = await playerModel.aggregate([
    {
      $addFields: {
        age: {
          $dateDiff: { startDate: "$dob", endDate: "$$NOW", unit: "year" },
        },
      },
    },
    {
      $project: {
        age: 1,
        firstName: 1,
        lastName: 1,
        dob: 1,
      },
    },
    {
      $match: {
        age: {
          $gt: 15,
        },
      },
    },
    {
      $sort: { age: -1 },
    },
  ]);

  res.status(200).json({
    result: players.length,
    data: players,
  });
});
// find name team  gruop by name club
app.use("/team-club-gruop", async (req, res) => {
  try {
    const teams = await teamModel.aggregate([
      {
        $lookup: {
          from: "clubs",
          localField: "club",
          foreignField: "_id",
          as: "club",
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $unwind: "$club" },
      {
        $group: {
          _id: "$club.name",
          count: {
            $sum: 1,
          },
          name_clubs: {
            $addToSet: "$name",
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // const result = await clubModel
    //   .find()
    //   .populate({
    //     path: "teams",
    //     select: "name -_id",
    //   })
    //   .select("name");

    res.status(200).json({
      result: teams.length,
      data: teams,
    });
  } catch (error) {
    console.log(error);
  }
});
// find team by name club
app.use("/team-club", async (req, res) => {
  const teams = await teamModel.aggregate([
    {
      $lookup: {
        from: "clubs",
        localField: "club",
        foreignField: "_id",
        as: "club",
        pipeline: [{ $project: { name: 1 } }],
      },
    },

    { $unwind: "$club" },
    {
      $match: {
        "club.name": "North Shore United",
      },
    },
  ]);

  /* const name_teams = await clubModel
    .find({ name: "North Shore United" })
    .populate({
      path: "teams",
      select: "name",
    }); */

  res.status(200).json({
    result: teams.length,
    data: teams,
  });
});

app.listen(PORT, () => {
  console.log(`> Run on port http://localhost:${PORT}`);
});

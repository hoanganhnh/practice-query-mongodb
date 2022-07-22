const express = require("express");
const mongoose = require("mongoose");

const connect = require("./db");

var ObjectId = require("mongodb").ObjectId;

// init app & middleware
const app = express();

// db connection
let db;

const PORT = 5000;

app.use(express.json());

connect();
// routes
app.get("/", async (req, res) => {
  const collection = mongoose.connection.db.collection("players");

  const users = await collection
    .aggregate([
      {
        $match: {
          firstName: "Thien",
          lastName: "Dang",
        },
      },
      {
        $lookup: {
          from: "teams",
          localField: "teams",
          foreignField: "_id",
          as: "player-team",
        },
      },
    ])
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
    // results: club_private_signup_links.length,
    data: club_private_signup_links,
  });
});

app.listen(PORT, () => {
  console.log(`> Run on port http://localhost:${PORT}`);
});

import express from "express";
import mongoose from "mongoose";

import connect from "./db.js";

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
    ])
    .toArray();

  res.status(200).json({
    results: users.length,
    data: users,
  });
});

app.get("/posts/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("posts")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Could not fetch the document" });
  }
});

app.post("/posts", (req, res) => {
  const newBook = req.body;
  db.collection("posts")
    .insertOne(newBook)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new doc" });
    });
});

app.listen(PORT, () => {
  console.log(`> Run on port http://localhost:${PORT}`);
});

const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/soccer", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect to DB successfull !");
    })
    .catch((err) => {
      console.error("Connect to DB failed !", err);
    });
};

module.exports = connect;

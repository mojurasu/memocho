module.exports = () => {
  const mongoose = require("mongoose");
  const connectionString =
    process.env.BIN_MONGO_CSTRING || "mongodb://localhost:27017/bin-store";

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const models = require("../model")(mongoose);
  return (req, res, next) => {
    req.mongoose = mongoose;
    req.models = models;
    next();
  };
};

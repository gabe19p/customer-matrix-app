const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
});

const Base = mongoose.model("Base", baseSchema);
module.exports = Base;

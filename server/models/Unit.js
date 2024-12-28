const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseName: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
});

const Unit = mongoose.model("Unit", unitSchema);
module.exports = Unit;

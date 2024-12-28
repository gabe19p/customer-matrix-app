const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures that name is always required
    unique: true, // Ensures the name field is unique
    trim: true, // Optional: trims whitespace from the value
  },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;

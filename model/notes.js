const mongoose = require("mongoose");

//create Schema for the Database
const NoteSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
    maxlength: 250,
  },
});
//create model using which user can interact with DB
const Notes = mongoose.model("notes", NoteSchema);

module.exports = Notes;

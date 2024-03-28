const Notes = require("../model/notes");

async function handleAllData(req, res) {
  const data = await Notes.find({});
  res.json(data);
}

async function handleNewData(req, res) {
  const body = req.body;
  if (!body || !body.author || !body.notes)
    return res.status(404).json({ msg: "Invalid entry" });
  const result = await Notes.create({
    author: body.author,
    notes: body.notes,
  });

  return res.status(200).json({ msg: "sucess", id: result._id });
}

async function handleDataByName(req, res) {
  try {
    const name = req.params.name;
    console.log(name);
    const authors = await Notes.find({ author: name });
    // res.json(authors.notes);
    const notes = authors.map((author) => author.notes);
    if (notes.length == 0) {
      return res.json({ msg: "user not found" });
    } else {
      return res.json(notes);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteByName(req, res) {
  try {
    const name = req.params.name;
    // Assuming Notes is a Mongoose model
    const author = await Notes.deleteMany({ author: name });
    console.log(author);

    if (author.deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: "No matching author found for deletion" });
    }

    return res
      .status(200)
      .json({ msg: "Deleted successfully", deletedCount: author.deletedCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateData(req, res) {
  const name = req.params.name;
  const { notes } = req.body;
  try {
    const currentNote = await Notes.find({ author: name });
    //console.log(note);
    for (let updateNote of currentNote) {
      updateNote.notes = notes;
      await updateNote.save();
    }

    res.json({ message: "Note updated" });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleAllData,
  handleNewData,
  handleDataByName,
  handleDeleteByName,
  handleUpdateData,
};

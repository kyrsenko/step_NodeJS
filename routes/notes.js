const Router = require("express");
const router = Router();
const Note = require("../models/note");

router.get("/notes", async (req, res) => {
  res.render("notes", {
    pageTitle: "notes"
  });
});

router.post("/api/notes", async (req, res) => {
  try {
    const note = await new Note({
      title: req.body.title,
      text: req.body.text
    });
    await note.save();
    console.log("created");
    res.json({
      created: true
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.find({ _id: req.params.id });
    res.render("note", {
      pageTitle: "note",
      note
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.body.id
    });
    res.json({
      deleted: true
    });
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
});

router.put("/api/notes/:id", async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        title: req.body.title,
        text: req.body.text
      }
    );
    res.json({
      edited: true
    });
    console.log("edited");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

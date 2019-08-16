
const Router = require("express");
const router = Router();
const TODO = require("../models/list");

router.get("/lists", (req, res) => {
  res.render("lists", {
    pageTitle: "lists"
  });
});

router.get("/lists/:id", async (req, res) => {
  try {
    const list = await TODO.find({
      _id: req.params.id
    });

    res.render("list", {
      pageTitle: "list",
      list
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/lists", async (req, res) => {
  try {
    const list = await new TODO({
      title: req.body.title,
      text: req.body.text
    });

    await list.save();
    res.json({
      created: true
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/api/lists/:id", async (req, res) => {
  try {
    await TODO.findOneAndUpdate(
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

    console.log("updated");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/lists/:id", async (req, res) => {
  try {
    await TODO.findOneAndDelete({
      _id: req.params.id
    });

    console.log("deleted");
    res.json({
      deleted: true
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;


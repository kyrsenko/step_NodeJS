
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
    await res.json({
      created: false
    })
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
    await res.json({
      edited: true
    }); 

  } catch (error) {
    await res.json({
      edited: false
    })
    console.log(error);
  }
});

router.delete("/api/lists/:id", async (req, res) => {
  try {
    await TODO.findOneAndDelete({
      _id: req.params.id
    });
    res.json({
      deleted: true
    });

  } catch (error) {
    await res.json({
      deleted: false
    })
    console.log(error);
  }
});

module.exports = router;


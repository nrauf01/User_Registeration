const express = require("express");
const router = express();
const path = require("path");
const database = require("../src/mongodb");
const templatePath = path.join(__dirname, "../templates");

router.use(express.json());
router.set("view engine", "hbs");
router.set("views", templatePath);
router.use(express.urlencoded({ extended: "false" }));

router.get("/", (req, res, next) => {
  return res.render("login");
});

router.get("/signup", (req, res, next) => {
  return res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  await database.insertMany([data]);

  return res.render("home");
});

router.post("/login", async (req, res, next) => {
  try {
    const check = await database.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      return res.render("home");
    } else {
      console.log("error");
      return res.send("wrong password");
    }
  } catch {
    res.status(500).send("wrong details");
  }
});

router.listen(3000, () => {
  console.log("port connected successfully");
});

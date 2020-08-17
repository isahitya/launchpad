const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");

const port = 5000;
const serverBaseURL = "http://localhost:" + port;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./uploads"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: "Our little secret",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
let upload = multer({ storage: storage });

const dl = require("./dl.js");
const Section = dl.Section;
const sectionSchema = dl.sectionSchema;
const K2Script = dl.K2Script;
const k2ScriptSchema = dl.k2ScriptSchema;
const User = dl.User;
const userSchema = dl.userSchema;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register", (req, res, next) => {
  //Lesson learnt, when using passport, 'username' field as identifying field, EVEN in the request body, or passport.authenticate will fail
  //if for some reason you need to use some other field, do it the correct way, it's a 2 step method for doing it
  console.log(req.body);
  User.register(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(user);
        passport.authenticate("local")(req, res, function() {
          console.log("User successfully registered");
          res.status(200).send();
        });
      }
    }
  );
});

app.get("/section", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const sections = await Section.find();
      res.json(sections);
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/section", async (req, res) => {
  console.log("Add section request");

  console.log(req.body);
  try {
    const sections = await Section.find({ name: req.body.name });

    if (sections.length != 0) {
      res.status(400).send({ message: "Category already exists" });
      return;
    }
    let iconURL = req.body.iconURL;
    if (!iconURL) iconURL = "";
    const sectionCount = await Section.estimatedDocumentCount();
    const sectionId = `c_${sectionCount + 1}`;
    const newSection = {
      id: sectionId,
      name: req.body.name,
      iconURL: iconURL,
      tiles: [],
    };
    Section.create(newSection);
    res.json({ sectionId: sectionId });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unknown error at server" });
  }
});

app.get("/k2Script", async (req, res) => {
  try {
    const k2Scripts = await K2Script.find();
    res.json(k2Scripts);
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/tile", upload.single("appIcon"), async (req, res) => {
  console.log("Add tile request");
  console.log(req.body);
  console.log(req.file);
  let { sectionId, ...newTile } = req.body;
  try {
    let section = await Section.findOne({ id: sectionId });
    if (!section) {
      throw "No such section";
    }
    const tileId = section.tiles.length + 1;
    newTile.id = tileId;
    if (!newTile.iconURL || newTile.iconURL == "") {
      newTile.iconURL =
        "https://www.google.com/s2/favicons?sz=128&domain_url=" + newTile.url;
    }
    if (req.file) {
      newTile.iconURL = serverBaseURL + "/" + req.file.filename;
    }
    section.tiles.push(newTile);
    section.save();
    res.json({ tileId: tileId, iconURL: newTile.iconURL });
    res.send();
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));

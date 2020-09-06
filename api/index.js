require("dotenv").config();
const metafetch = require("metafetch");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const port = 5000;
const serverBaseURL = "http://localhost:" + port;
const app = express();

const gs = require("./launchpad_populate/genSections");
const gk = require("./launchpad_populate/genK2Scripts");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./uploads"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://localhost:3000"],
  })
);

app.use(
  session({
    secret: "Our little secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 36000000,
    },
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
const { Meta } = require("./dl.js");
const Section = dl.Section;
const sectionSchema = dl.sectionSchema;
const K2Script = dl.K2Script;
const k2ScriptSchema = dl.k2ScriptSchema;
const User = dl.User;
const userSchema = dl.userSchema;

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//User registers/logins with Google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "748520804903-4r8a06cvcafrrtfsjp4it8c15fjst1oh.apps.googleusercontent.com",
      clientSecret: "mlvvFpwURvmO-nFjH_uP5XwY",
      callbackURL: serverBaseURL + "/auth/google/launchpad",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          googleId: profile.id,
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              googleId: profile.id,
              username: profile.id,
              sections: [],
              k2Scripts: [],
              newTileId: 1,
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

//User registers/logins with Github
passport.use(
  new GitHubStrategy(
    {
      clientID: "ad73e3a8b3b21411a2fc",
      clientSecret: "951c1e46fcd550da17dc52cef69c5a5ae554a07e",
      callbackURL: serverBaseURL + "/auth/github/launchpad",
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne(
        {
          githubId: profile.id,
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              githubId: profile.id,
              username: profile.id,
              sections: [],
              k2Scripts: [],
              newTileId: 1,
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      // if (!user.verifyPassword(password)) {
      //   return done(null, false);
      // }
      return done(null, user);
    });
  })
);

const actions = {
  ADD: 1,
  UPDATE: 2,
  DELETE: 3,
  LOGIN: 4,
  LOGOUT: 5,
  REGISTER: 6,
};

const subjects = {
  SECTION: 1,
  TILE: 2,
  K2SCRIPTSECTION: 3,
  K2SCRIPT: 4,
};

function logActivity({
  userId,
  action,
  subject,
  tile,
  k2Script,
  section,
  k2ScriptSection,
  time,
}) {
  if (!action) {
    throw "Please specify an action";
  }
  let activity = undefined;
  if ([actions.LOGIN, actions.LOGOUT, actions.REGISTER].includes(action)) {
    activity = {
      action: action,
      at: time ? time : new Date(),
    };
  }
  if ([actions.ADD, actions.UPDATE, actions.DELETE].includes(action)) {
    activity = {
      action: action,
      at: time ? time : new Date(),
      subject: subject,
    };
    if (section) activity.section = section;
    if (tile) activity.tile = tile;
    if (k2ScriptSection) activity.k2ScriptSection = k2ScriptSection;
    if (k2Script) activity.k2Script = k2Script;
  }
  if (!activity) {
    throw "Cannot log user activity";
  }
  if (userId == undefined) {
    return activity;
  }
  console.log("Loggin activity");
  console.log(userId);
  console.log(activity);
  User.updateOne(
    { username: userId },
    { $push: { activities: activity } }
  ).then((res) => {
    console.log(res);
    console.log("activity logged");
  }); //Not working
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register", (req, res, next) => {
  User.register(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // sections: gs.getCategories(),
      // k2Scripts: gk.genK2Scripts(),
      sections: [],
      k2Scripts: [],
      newTileId: 1,
    },
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        passport.authenticate("local")(req, res, function() {
          console.log("User successfully registered");
          res.status(200).send();
          logActivity({ userId: req.user.username, action: actions.REGISTER });
        });
      }
    }
  );
});

app.post("/login", async (req, res) => {
  console.log("Login request on server");
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    req.login(user, function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        passport.authenticate("local")(req, res, function() {
          console.log("User logged in");
          res.json({ token: req.sessionID });
          logActivity({ userId: req.user.username, action: actions.LOGIN });
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/logout", (req, res) => {
  req.logout();
  //  logActivity({ userId: req.user.username, action: actions.LOGOUT }); Can't get username
  res.status(200).send();
});

app.get("/user", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      console.log("User not authenticated");
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/launchpad",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["read:user"] })
);

app.get(
  "/auth/github/launchpad",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.get("/section", async (req, res) => {
  console.log("Get sections called");

  try {
    if (req.isAuthenticated()) {
      res.json(req.user.sections);
    } else {
      console.log("User not authenticated");
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/k2Script", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json(req.user.k2Scripts);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/section", async (req, res) => {
  console.log("Add section request");
  try {
    const sections = req.user.sections;
    const sectionExists = sections.find((s) => s.name == req.body.name);

    if (sectionExists) {
      res.status(400).send({ message: "Section already exists" });
      return;
    }
    let iconURL = req.body.iconURL;
    if (!iconURL) iconURL = "";
    const sectionCount = sections.length;
    const sectionId = `c_${sectionCount + 1}`;
    const newSection = {
      id: sectionId,
      name: req.body.name,
      iconURL: iconURL,
      tiles: [],
    };
    sections.push(newSection);

    req.user.save();
    res.json({ sectionId: sectionId });
    res.send();
    logActivity({
      userId: req.user.username,
      action: actions.ADD,
      subject: subjects.SECTION,
      section: newSection,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unknown error at server" });
  }
});

async function fetchPageName(url) {
  let name = null;
  const meta = await metafetch.fetch(url);
  if (meta.siteName) {
    name = meta.siteName;
  } else if (meta.keywords) {
    name = meta.keywords.split(",")[0];
  } else if (meta.Keywords) {
    name = meta.Keywords.split(",")[0];
  } else if (meta.meta.keywords) {
    name = meta.meta.keywords.split(",")[0];
  } else if (meta.meta.Keywords) {
    name = meta.meta.Keywords.split(",")[0];
  } else if (meta.title) {
    name = meta.title;
  } else if (meta.url) {
    name = meta.url;
  }
  return name;
}

app.post("/tile", upload.single("appIcon"), async (req, res) => {
  console.log("Add tile request");
  try {
    let { sectionId, ...newTile } = req.body;
    let section = req.user.sections.find((s) => s.id == sectionId);
    if (!section) {
      throw "No such section";
    }

    const newTileId = (
      await User.findOneAndUpdate(
        { username: req.user.username },
        { $inc: { newTileId: 1 } },
        { returnOriginal: false }
      )
    ).newTileId;
    //Tile ID
    const tileId = "t_" + newTileId;
    newTile.id = tileId;
    //Tile icon either from url or file
    if (!newTile.iconURL || newTile.iconURL == "") {
      newTile.iconURL =
        "https://www.google.com/s2/favicons?sz=128&domain_url=" + newTile.url;
    }
    if (req.file) {
      newTile.iconURL = serverBaseURL + "/" + req.file.filename;
    }
    //Tile name from page meta if not given by user
    if (!newTile.name || newTile.iconURL == "") {
      try {
        const name = await fetchPageName(newTile.url);
        newTile.name = name != null && name != "" ? name : newTile.url;
      } catch (err) {
        console.log(err);
        console.log("Could not fetch page name");
        newTile.name = newTile.url;
      }
    }

    const success = await User.update(
      { _id: req.user._id, "sections.id": sectionId },
      { $push: { "sections.$.tiles": newTile } }
    );
    if (!success) {
      throw "Couldn't add app";
    }

    res.json({
      tileId: newTile.id,
      iconURL: newTile.iconURL,
      name: newTile.name,
    });
    res.send();
    logActivity({
      userId: req.user.username,
      action: actions.ADD,
      subject: subjects.TILE,
      tile: newTile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

app.delete("/tile", async (req, res) => {
  console.log("Delete tile called");
  console.log(req.body);
  try {
    const success = await User.update(
      { _id: req.user._id, "sections.id": req.body.sectionId },
      { $pull: { "sections.$.tiles": { id: req.body.id } } }
    );
    if (!success) {
      throw "Could not remove tile";
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));

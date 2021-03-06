const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

mongoose.connect("mongodb://localhost:27017/launchpadDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const sectionSchema = new mongoose.Schema({
  name: String,
  iconURL: String,
  tiles: Array,
});
const Section = mongoose.model("Section", sectionSchema);

const k2ScriptSchema = new mongoose.Schema({
  name: String,
  iconURL: String,
  tiles: Array,
});
const K2Script = mongoose.model("K2Script", k2ScriptSchema);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  googleId: String,
  githubId: String,
  password: String,
  sections: Array,
  k2Scripts: Array,
  activities: Array,
  newTileId: Number,
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

// module.exports.Section = Section;
// module.exports.sectionSchema = sectionSchema;
// module.exports.K2Script = K2Script;
// module.exports.k2ScriptSchema = k2ScriptSchema;
// module.exports.User = User;
// module.exports.userSchema = userSchema;

const metaSchema = new mongoose.Schema({
  newTileId: Number,
  name: String,
});
const Meta = mongoose.model("Meta", metaSchema);

module.exports = {
  Section,
  sectionSchema,
  K2Script,
  k2ScriptSchema,
  User,
  userSchema,
  Meta,
  metaSchema,
};

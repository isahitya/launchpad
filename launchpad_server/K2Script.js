const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/launchpadDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const k2ScriptSchema = new mongoose.Schema({
    name: String,
    iconURL: String,
    tiles: Array,
});

const K2Script = mongoose.model("K2Script", k2ScriptSchema);

module.exports.K2Script = K2Script;
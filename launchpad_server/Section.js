const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/launchpadDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const sectionSchema = new mongoose.Schema({
    id: String,
    name: String,
    iconURL: String,
    tiles: Array,
});

const Section = mongoose.model("Section", sectionSchema);

module.exports.Section = Section;
module.exports.sectionSchema = sectionSchema;
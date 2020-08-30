module.exports.insertSections = async (port) => {

    const gc = require("./genSections.js");

    const mongoose = require("mongoose");

    mongoose.connect(`mongodb://localhost:${port}/launchpadDB`, {
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

    let categories = gc.getCategories();

    const work = new Section(categories[0]);
    const hr = new Section(categories[1]);

    await Section.insertMany([work, hr]);
}
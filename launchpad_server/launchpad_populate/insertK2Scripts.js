module.exports.insertK2Scripts = async (port) => {
    const gk = require("./genK2Scripts.js");

    const mongoose = require("mongoose");

    mongoose.connect(`mongodb://localhost:${port}/launchpadDB`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const k2ScriptSchema = new mongoose.Schema({
        id: String,
        name: String,
        iconURL: String,
        tiles: Array,
    });

    const K2Script = mongoose.model("K2Script", k2ScriptSchema);

    await K2Script.insertMany(gk.genK2Scripts());

}
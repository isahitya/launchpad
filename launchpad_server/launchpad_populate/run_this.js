const is = require("./insertSections");
const ik = require("./insertK2Scripts");

const insertSections = is.insertSections;
const insertK2Scripts = ik.insertK2Scripts;


async function populateData(port) {
    await insertSections(port);
    await insertK2Scripts(port);
    process.exit(-1);
}

const port = "27017";
populateData(port);
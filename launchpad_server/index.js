const gs = require("./Section.js");
const k2 = require("./K2Script.js");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer")

const Section = gs.Section;
const sectionSchema = gs.sectionSchema
const K2Script = k2.K2Script;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({ storage: storage })

const port = 5000
const serverBaseURL = "http://localhost:" + port

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.static('./uploads'))


app.get("/getSections", async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);
        res.send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.get("/getK2Scripts", async (req, res) => {
    try {
        const k2Scripts = await K2Script.find();
        res.json(k2Scripts);
        res.send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

app.post("/addSection", async (req, res) => {
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
        const newSection = { id: sectionId, name: req.body.name, iconURL: iconURL, tiles: [] };
        Section.create(newSection);
        res.json({ sectionId: sectionId })
        res.send();

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error at server" });
    }
});

app.post("/addTile", upload.single("appIcon"), async (req, res) => {
    console.log("Add tile request");
    console.log(req.body);
    console.log(req.file)
    let { sectionId, ...newTile } = req.body;
    try {
        let section = await Section.findOne({ id: sectionId });
        if (!section) {
            throw "No such section";
        }
        const tileId = section.tiles.length + 1;
        newTile.id = tileId;
        if (!newTile.iconURL || newTile.iconURL == "") {
            newTile.iconURL = "https://www.google.com/s2/favicons?domain_url=" + newTile.url;
        }
        if (req.file) {
            newTile.iconURL = serverBaseURL + "/" + req.file.filename;
        }
        section.tiles.push(newTile);
        section.save();
        res.json({ tileId: tileId, iconURL: newTile.iconURL })
        res.send();
    } catch (err) {
        res.status(500).send({ message: err });
    }
});

app.listen(5000, () => console.log("Server started on port 5000"));
let categoryCounter = 1;

function createCategory(name, iconURL) {
  return {
    id: "c_" + categoryCounter++,
    name: name,
    iconURL: iconURL,
    tiles: [],
  };
}

let tileCounter = 1;

function createTile(name, iconURL, tileURL = "") {
  return {
    id: "t_" + tileCounter++,
    name: name,
    iconURL: iconURL,
    url: tileURL,
  };
}

let baseTileURL = "/tiles/";
let baseCategoryURL = "/sections/";

function getIconURL(iconName) {
  return baseTileURL + iconName;
}

function getCategories() {
  let application = createCategory("Work", baseCategoryURL + "work.png");
  let k2Scripts = createCategory("HR", baseCategoryURL + "hr.png");
  let applicationTiles = [
    createTile(
      "Taminator",
      getIconURL("robot_arm.png"),
      "https://taminator.aws.com"
    ),
    createTile("Cost Explorer", getIconURL("cost_explorer.png")),
    createTile("Paragon", getIconURL("paragon.png")),
    createTile("Phone Tool", getIconURL("phone_tool.png")),

    createTile("Payroll", getIconURL("payroll.png")),
    createTile("Benefits", getIconURL("benefits.png")),
    createTile("TAM Wiki", getIconURL("wikipedia.png")),
  ];
  let k2ScriptsTiles = [createTile("RDBMS", getIconURL("rdbms.png"))];
  application.tiles = applicationTiles;
  k2Scripts.tiles = k2ScriptsTiles;
  return [application, k2Scripts];
}

exports.getCategories = getCategories;

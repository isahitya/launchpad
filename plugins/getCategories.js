// import AWS from "aws-sdk";

// async function getCategories() {
//   AWS.config.update({
//     region: "us-east-1",
//     endpoint: "dynamodb.us-east-1.amazonaws.com",
//     accessKeyId: "AKIAWNLQ4NOMJEMUXBFL",
//     secretAccessKey: "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",
//   });

//   var docClient = new AWS.DynamoDB.DocumentClient();

//   var params = {
//     TableName: "Categories",
//   };

//   return docClient.scan(params).promise();
// }

let categoryCounter = 1;

function createCategory(name, iconURL) {
  return {
    id: "c_" + categoryCounter++,
    name: name,
    iconURL: iconURL,
    tiles: {},
  };
}

let tileCounter = 1;

function createTile(name, iconURL, tileURL = "") {
  return {
    id: "t_" + tileCounter++,
    name: name,
    description: "",
    iconURL: iconURL,
    tileURL: tileURL,
  };
}

let baseTileURL = "/tiles/";
let baseCategoryURL = "https://launchpad-aws.s3.amazonaws.com/icons/";

function getIconURL(iconName) {
  return baseTileURL + iconName;
}

async function getCategories() {
  let application = createCategory("Application", baseCategoryURL + "apps.png");
  let k2Scripts = createCategory(
    "K2 Scripts",
    baseCategoryURL + "tag_icon.png"
  );
  let applicationTiles = {
    Work: [
      createTile(
        "Taminator",
        getIconURL("robot_arm.png"),
        "https://taminator.aws.com"
      ),
      createTile("Cost Explorer", getIconURL("cost_explorer.png")),
      createTile("Paragon", getIconURL("paragon.png")),
      createTile("Phone Tool", getIconURL("phone_tool.png")),
    ],
    HR: [
      createTile("Payroll", getIconURL("payroll.png")),
      createTile("Benefits", getIconURL("benefits.png")),
      createTile("TAM Wiki", getIconURL("wikipedia.png")),
    ],
  };
  let k2ScriptsTiles = {
    DB: [createTile("RDBMS", getIconURL("rdbms.png"))],
  };
  application.tiles = applicationTiles;
  k2Scripts.tiles = k2ScriptsTiles;
  return { Items: [application, k2Scripts] };
}

export default (context, inject) => {
  inject("getCategories", getCategories);
};

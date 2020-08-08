import axios from "axios";

const apiURL = "http://localhost:5000";

const apiLogic = {
  addTile: async (tile) => {
    try {
      let response = await axios.post(apiURL + "/addTile", tile);
      console.log(response);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default (context, inject) => {
  inject("apiLogic", apiLogic);
};

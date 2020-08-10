import axios from "axios";

let apiLogic = {
  apiURL: "http://localhost:5000",
  async addTile(tile) {
    try {
      let response = await axios.post(this.apiURL + "/addTile", tile);
      console.log(response);
      return response.data.tileId;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getK2Scripts() {
    return axios.get(this.apiURL + "/getK2Scripts");
  },
  getSections() {
    return axios.get(this.apiURL + "/getSections");
  },
  async addSection(section) {
    try {
      const response = await axios.post("http://localhost:5000/addSection", {
        name: section.name,
        iconURL: section.iconURL,
      });
      console.log(response);
      return response.data.sectionId;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  },
};

export default (context, inject) => {
  inject("apiLogic", apiLogic);
};

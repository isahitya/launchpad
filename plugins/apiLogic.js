import axios from "axios";
axios.defaults.withCredentials = true;
let apiLogic = {
  apiURL: "http://localhost:5000",
  jsonRequestOptions: {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  defaultRequestOptions: {
    withCredentials: true,
  },
  async addTile(tile) {
    try {
      let tileFormData = new FormData();
      for (let key in tile) {
        if (tile[key] instanceof File) {
          tileFormData.append("appIcon", tile[key], tile[key].name);
        } else tileFormData.append(key, tile[key]);
      }

      let response = await axios.post(
        this.apiURL + "/tile",
        tileFormData,
        this.jsonRequestOptions
      );
      console.log(response);
      return { tileId: response.data.tileId, iconURL: response.data.iconURL };
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getK2Scripts() {
    return axios.get(this.apiURL + "/k2Script", this.jsonRequestOptions);
  },
  getSections() {
    return axios.get(this.apiURL + "/section", this.jsonRequestOptions);
  },
  async addSection(section) {
    try {
      const response = await axios.post(
        this.apiURL + "/section",
        {
          name: section.name,
          iconURL: section.iconURL,
        },
        this.jsonRequestOptions
      );
      console.log(response);
      return response.data.sectionId;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  },
  async registerUser(user) {
    try {
      const response = await axios.post(
        this.apiURL + "/register",
        user,
        this.jsonRequestOptions
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async loginUser(user) {
    try {
      const response = await axios.post(
        this.apiURL + "/login",
        user,
        this.jsonRequestOptions
      );
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

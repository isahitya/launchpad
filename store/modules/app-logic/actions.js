import axios from "axios";

export default {
  async nuxtServerInit(vuexContext, context) {
    try {
      let sectionsResponse = await this.$getSections();
      let k2ScriptsResponse = await this.$getK2Scripts();
      vuexContext.commit("initializeAppData", {
        sections: sectionsResponse.data,
        k2Scripts: k2ScriptsResponse.data,
      });
    } catch (err) {
      console.log("Cannot load data from server");
      console.log(err); //TODO: redirect to error page with appropriate message
    }
  },
  setSearchFilter(vuexContext, searchFilter) {
    vuexContext.commit("setSearchFilter", searchFilter);
  },
  setSelectedSection(vuexContext, sectionId) {
    vuexContext.commit("setSelectedSection", sectionId);
  },
  setAccountNo(vuexContext, value) {
    vuexContext.commit("setAccountNo", value);
  },
  setSelectedRegion(vuexContext, code) {
    vuexContext.commit("setSelectedRegion", code);
  },
  createTile(vuexContext, tile) {
    vuexContext.commit("createTile", tile);
  },
  async createSection(vuexContext, sectionName) {
    try {
      const response = await axios.post("http://localhost:5000/addSection", {
        name: sectionName,
      });
      console.log(response.data); //TODO: Retrive section object from server
      vuexContext.commit("createSection", sectionName);
    } catch (err) {
      console.log(err.message);
    }
  },
};

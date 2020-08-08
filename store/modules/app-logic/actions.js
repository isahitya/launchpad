import axios from "axios";

export default {
  async nuxtServerInit(vuexContext, context) {
    try {
      let response = await this.$getSections();
      vuexContext.commit("initializeAppData", response.data);
    } catch (err) {
      console.log("Cannot load data from server");
      console.log(err); //TODO: redirect to error page with appropriate message
    }
  },
  setSearchFilter(vuexContext, searchFilter) {
    vuexContext.commit("setSearchFilter", searchFilter);
  },
  setSelectedCategory(vuexContext, categoryId) {
    vuexContext.commit("setSelectedCategory", categoryId);
  },
  async createCategory(vuexContext, categoryName) {
    try {
      const response = await axios.post("http://localhost:5000/addSection", {
        name: categoryName,
      });
      console.log(response.data); //TODO: Retrive category object from server
      vuexContext.commit("createCategory", categoryName);
    } catch (err) {
      console.log(err.message);
    }
  },
  createTile(vuexContext, tile) {
    vuexContext.commit("createTile", tile);
  },
};

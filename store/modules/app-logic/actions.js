export default {
  async nuxtServerInit(vuexContext, context) {
    try {
      let response = await this.$getCategories();

      vuexContext.commit("initializeAppData", response.Items);
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
  createCategory(vuexContext, categoryName) {
    vuexContext.commit("createCategory", categoryName);
  },
  createGroup(vuexContext, group) {
    vuexContext.commit("createGroup", group);
  },
  createTile(vuexContext, tile) {
    vuexContext.commit("createTile", tile);
  },
};

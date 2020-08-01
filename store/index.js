import Vuex from "vuex";

const createStore = () => {
  const baseIconURL = "https://launchpad-aws.s3.amazonaws.com/icons/";
  return new Vuex.Store({
    state: {
      categories: [],
      selectedCategory: {},
      searchFilter: "",
    },
    mutations: {
      setSearchFilter(state, searchFilter) {
        state.searchFilter = searchFilter;
      },
      setSelectedCategory(state, categoryId) {
        state.selectedCategory = state.categories.find(
          (c) => c.id == categoryId
        );
      },

      initializeAppData(state, categoryData) {
        state.categories = categoryData;
        state.selectedCategory = state.categories[0];
      },
    },
    actions: {
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
    },
  });
};

export default createStore;

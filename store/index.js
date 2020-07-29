import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      categories: [],
      selectedCategory: {},
      searchFilter: "",
      accountNumber: "",
      regions: [
        { name: "US East (N. Virginia)", code: "us-east-1" },
        { name: "US East (Ohio)", code: "us-east-2" },
      ],
      selectedRegion: {},
    },
    mutations: {
      setSearchFilter(state, searchFilter) {
        state.searchFilter = searchFilter;
      },
      setAccountNumber(state, accountNumber) {
        state.accountNumber = accountNumber;
      },
      setSelectedCategory(state, categoryId) {
        state.selectedCategory = state.categories.find(
          (c) => c.id == categoryId
        );
      },
      setSelectedRegion(state, code) {
        state.selectedRegion = state.regions.find((r) => r.code == code);
      },
      initializeAppData(state, categoryData) {
        state.categories = categoryData;
        state.selectedCategory = state.categories[0];
        state.selectedRegion = state.regions[0];
      },
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        try {
          let response = await this.$getCategoryData();
          vuexContext.commit("initializeAppData", response.Items);
        } catch (err) {
          console.log("Cannot load data from server");
          console.log(err); //TODO: redirect to error page with appropriate message
        }
      },
      initializeAppData(vuexContext) {},

      setSearchFilter(vuexContext, searchFilter) {
        vuexContext.commit("setSearchFilter", searchFilter);
      },
      setAccountNumber(vuexContext, accountNumber) {
        vuexContext.commit("setAccountNumber", accountNumber);
      },
      setSelectedCategory(vuexContext, categoryId) {
        vuexContext.commit("setSelectedCategory", categoryId);
      },
      setSelectedRegion(vuexContext, regionCode) {
        vuexContext.commit("setSelectedRegion", regionCode);
      },
    },
  });
};

export default createStore;

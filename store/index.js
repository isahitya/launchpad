import Vuex from "vuex";

const createStore = () => {
  const baseIconURL = "https://launchpad-aws.s3.amazonaws.com/icons/";
  return new Vuex.Store({
    state: {
      categories: [],
      selectedCategory: {},
      searchFilter: "",
      accountNumber: "",
      regions: [
        { name: "US East (N. Virginia)", code: "us-east-1" },
        { name: "US East (Ohio)", code: "us-east-2" },
        { name: "US West (N. California)", code: "us-west-1" },
        { name: "US West (Oregon)", code: "us-west-2" },
        { name: "Africa (Cape Town)", code: "af-south-1" },
        { name: "Asia Pacific (Hong Kong)", code: "ap-east-1" },
        { name: "Asia Pacific (Mumbai)", code: "ap-south-1" },
        { name: "Asia Pacific (Seoul)", code: "ap-northeast-2" },
        { name: "Asia Pacific (Singapore)", code: "ap-southeast-1" },
        { name: "Asia Pacific (Sydney)", code: "ap-southeast-2" },
        { name: "Asia Pacific (Tokyo)", code: "ap-northeast-1" },
        { name: "Canada (Central)", code: "ca-central-1" },
        { name: "Europe (Frankfurt)", code: "eu-central-1" },
        { name: "Europe (Ireland)", code: "eu-west-1" },
        { name: "Europe (London)", code: "eu-west-2" },
        { name: "Europe (Milan)", code: "eu-south-1" },
        { name: "Europe (Paris)", code: "eu-west-3" },
        { name: "Europe (Stockholm)", code: "eu-north-1" },
        { name: "Middle East (Bahrain)", code: "me-south-1" },
        { name: "South America (São Paulo)", code: "sa-east-1" },
      ],
      selectedRegion: {},
      iconURLs: {
        hamburger: baseIconURL + "hamburger_menu_icon.png",
        search: baseIconURL + "search.png",
        downArrow: baseIconURL + "down_arrow.png",
        awsLogo: baseIconURL + "aws_logo.png",
        awsLogoOld: baseIconURL + "aws_logo_old.png",
        awsLogoWhite: baseIconURL + "aws_logo_white.png",
      },
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

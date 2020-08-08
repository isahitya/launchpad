import actions from "./actions";
import mutations from "./mutations";

const defaultState = {
  categories: [],
  selectedCategory: {},
  searchFilter: "",
  homeSectionSelected: true,
};

const state = defaultState;

export default {
  state,
  actions,
  mutations,
};

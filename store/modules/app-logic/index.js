import actions from "./actions";
import mutations from "./mutations";

const defaultState = {
  categories: [],
  selectedCategory: {},
  searchFilter: "",
};

const state = defaultState;

export default {
  state,
  actions,
  mutations,
};

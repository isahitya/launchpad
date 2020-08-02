import Vuex from "vuex";
import appLogic from "./modules/app-logic";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      appLogic: appLogic,
    },
  });
};

export default createStore;

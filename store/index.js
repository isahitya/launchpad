import Vuex from "vuex";

const createStore = () => {
  let categories = [];
  for (let x = 0; x < 5; ++x) {
    let category = {
      id: `c${x + 1}`,
      name: `Category ${x + 1}`,
      tiles: []
    };
    for (let i = 0; i < 10; ++i) {
      let tile = {
        id: `t${i + 1}`,
        name: `Title ${i + 1}`,
        description: `Description for ${category.name}, Tile ${i + 1}`
      };
      category.tiles.push(tile);
    }
    categories.push(category);
  }
  return new Vuex.Store({
    state: {
      categories: categories,
      selectedCategory: categories[0],
      searchFilter: ""
    },
    mutations: {
      setSearchFilter(state, searchFilter) {
        state.searchFilter = searchFilter;
      },
      setSelectedCategory(state, categoryId) {
        let filteredCategories = categories.filter(c => {
          return c.id == categoryId;
        });
        state.selectedCategory = filteredCategories[0];
      }
    },
    actions: {
      setSearchFilter(vuexContext, searchFilter) {
        vuexContext.commit("setSearchFilter", searchFilter);
      },
      setSelectedCategory(vuexContext, categoryId) {
        vuexContext.commit("setSelectedCategory", categoryId);
      }
    }
  });
};

export default createStore;


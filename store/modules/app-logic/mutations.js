export default {
  setSearchFilter(state, searchFilter) {
    state.searchFilter = searchFilter;
  },
  setSelectedCategory(state, categoryId) {
    if (!categoryId) {
      state.selectedCategory = {};
      return;
    }
    state.selectedCategory = state.categories.find((c) => c.id == categoryId);
  },
  createCategory(state, categoryName) {
    let category = {
      id: "c_" + categoryName,
      name: categoryName,
      iconURL: "",
      tiles: [],
    };
    state.categories.push(category);
  },
  createTile(state, tile) {
    let category = state.categories.find((c) => {
      return c.id == tile.categoryId;
    });
    if (!category) {
      console.log("Category not found");
      return;
    }
    let newTile = {
      id: "t_" + tile.name,
      name: tile.name,
      iconURL: tile.iconURL,
      tileURL: tile.tileURL,
    };
    category.tiles.push(newTile);
  },
  initializeAppData(state, categoryData) {
    state.categories = categoryData;
    //state.selectedCategory = state.categories[0];
  },
};

export default {
  setSearchFilter(state, searchFilter) {
    console.log(searchFilter);
    state.searchFilter = searchFilter;
  },
  setSelectedCategory(state, categoryId) {
    state.selectedCategory = state.categories.find((c) => c.id == categoryId);
  },
  createCategory(state, categoryName) {
    let category = {
      id: "c_" + categoryName,
      name: categoryName,
      iconURL: "",
      tiles: {},
    };
    state.categories.push(category);
  },
  createGroup(state, group) {
    let category = state.categories.find((c) => {
      return c.id == group.categoryId;
    });
    category.tiles[group.name] = [];
  },
  createTile(state, tile) {
    console.log(tile);
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
      description: "",
      iconURL: tile.iconURL,
      tileURL: tile.tileURL,
    };
    if (!category.tiles[tile.group]) {
      if (!category.tiles["All"]) category.tiles["All"] = [];
      category.tiles["All"].push(newTile);
      return;
    }
    category.tiles[tile.group].push(newTile);
  },
  initializeAppData(state, categoryData) {
    state.categories = categoryData;
    state.selectedCategory = state.categories[0];
  },
};

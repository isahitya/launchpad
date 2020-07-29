<!--
<Content> component will generate:
  - <Tile> component for tiles of the selected category
-->
<template>
  <div class="content">
    <a
      style="text-decoration:none"
      v-for="tile in tilesToDisplay"
      :key="tile.id"
      :href="createURL(tile.baseURL)"
    >
      <Tile :name="tile.name" :description="tile.description" />
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    tilesToDisplay() {
      let state = this.$store.state;
      let filter = state.searchFilter.toUpperCase();
      let tiles = [];
      if (filter.length) {
        state.categories.forEach((category) => {
          let filteredTiles = category.tiles.filter(
            (tile) =>
              tile.name.toUpperCase().includes(filter) ||
              tile.description.toUpperCase().includes(filter)
          );
          tiles.push(...filteredTiles);
        });
      } else tiles = state.selectedCategory.tiles;
      return tiles;
    },
  },
  methods: {
    createURL(baseURL) {
      return (
        baseURL +
        "?" +
        "accountId=" +
        this.$store.state.accountNumber +
        "&region=" +
        this.$store.state.selectedRegion.code
      );
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 0rem;
  padding-top: 1.5rem;
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f7f6f6;
  height: calc(100vh - 4rem);
}

@media (max-width: 30rem) {
  .content {
    flex-direction: column;
    align-items: center;
    align-content: center;
    grid-template-columns: 100vw;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
}
</style>

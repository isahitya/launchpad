<!--
<Content> component will generate:
  - Groups of <Tile> component for tiles of (the selected category) or (tiles that include search filter from all categories)
-->
<template>
  <div class="content">
    <div
      class="tile-group-container"
      v-for="(tileGroupTiles, tileGroupName) in tilesToDisplay"
      :key="tileGroupName"
    >
      <h1>{{ tileGroupName }}</h1>
      <div class="tiles-container">
        <a
          style="text-decoration:none"
          v-for="tile in tileGroupTiles"
          :key="tile.id"
          :href="tile.tileURL"
        >
          <Tile :name="tile.name" :iconURL="tile.iconURL" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tilesToDisplay() {
      const filter = this.$store.state.appLogic.searchFilter.toUpperCase();
      if (filter.length == 0) {
        return this.$store.state.appLogic.selectedCategory.tiles;
      }
      let tiles = {};
      this.$store.state.appLogic.categories.forEach((category) => {
        tiles = { ...tiles, ...this.filterTiles(category.tiles, filter) };
      });
      return tiles;
    },
  },
  methods: {
    filterTiles(tiles, filter) {
      let tileGroups = {};
      for (const [key, value] of Object.entries(tiles)) {
        let filteredTiles = value.filter((element) => {
          return (
            element.name.toUpperCase().includes(filter) ||
            element.description.toUpperCase().includes(filter)
          );
        });
        if (filteredTiles.length) {
          tileGroups[key] = filteredTiles;
        }
      }
      return tileGroups;
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 3rem;
  margin-left: 16rem;
  padding-top: 3rem;
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f7f6f6;
  height: 100%;
  width: calc(100vw - 16rem);
  min-height: 100vh;
}

.tile-group-container {
  width: 100%;
  margin-bottom: 1.5rem;
}

.tile-group-container > h1 {
  font-size: 0.8rem;
  font-weight: 400;
  color: rgb(83, 83, 83);
  margin: 0px;
  margin-left: 1rem;
}

.tiles-container {
  display: flex;
  flex-wrap: wrap;
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

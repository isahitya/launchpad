<!--
<Content> component will generate:
  - <Tile> component for tiles of the selected category
-->
<template>
  <div class="content">
    <Tile
      v-for="tile in tilesToDisplay"
      :key="tile.id"
      :name="tile.name"
      :description="tile.description"
    />
  </div>
</template>

<script>
export default {
  computed: {
    tilesToDisplay() {
      let filter = this.$store.state.searchFilter.toUpperCase();
      return this.$store.state.selectedCategory.tiles.filter((t) => {
        return (
          t.name.toUpperCase().includes(filter) ||
          t.description.toUpperCase().includes(filter)
        );
      });
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

<template>
  <div class="app-content">
    <div class="content">
      <Tile
        v-for="tile in tilesToDisplay"
        :key="tile.id"
        :name="tile.name"
        :description="tile.description"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tilesToDisplay() {
      let filter = this.$store.state.searchFilter.toUpperCase();
      return this.$store.state.selectedCategory.tiles.filter(t => {
        return (
          t.name.toUpperCase().includes(filter) ||
          t.description.toUpperCase().includes(filter)
        );
      });
    }
  }
};
</script>

<style scoped>
.app-content {
  display: grid;
  height: calc(100vh - 4rem);
}

.content {
  margin-top: 0rem;
  padding-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f7f6f6;
}

.selected-category-title {
  align-self: flex-start;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
  display: none;
  color: black;
  font-size: 1.5rem;
  font-weight: 300;
}

@media (max-width: 30rem) {
  .app-content {
    grid-template-columns: 100vw;
  }
  .content {
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
  .selected-category-title {
    display: inline-block;
  }
}
</style>


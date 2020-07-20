<template>
  <div class="app-content">
    <AppSidebar />
    <div class="content">
      <Tile
        v-for="tile in tiles"
        key="title"
        :title="tile.title"
        :text="tile.text"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tiles: [
        { title: "Tile 1", text: "Text for tile 1" },
        { title: "Tile 2", text: "Text for tile 2" },
        { title: "Tile 3", text: "Text for tile 3" },
        { title: "Tile 4", text: "Text for tile 4" },
        { title: "Tile 5", text: "Text for tile 5" },
        { title: "Tile 6", text: "Text for tile 6" },
        { title: "Tile 7", text: "Text for tile 7" },
        { title: "Tile 8", text: "Text for tile 8" },
        { title: "Tile 9", text: "Text for tile 9" },
        { title: "Tile 10", text: "Text for tile 10" },
        { title: "Tile 11", text: "Text for tile 11" }
      ]
    };
  }
};
</script>

<style scoped>
.app-content {
  display: grid;
  grid-template-columns: 15rem calc(100vw - 15rem);
  height: calc(100vh - 4rem);
}

.content {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
}
</style>

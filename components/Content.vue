<!--
<Content> component will generate:
  - Groups of <Tile> component for tiles of (the selected category) or (tiles that include search filter from all categories)
-->
<template>
  <div class="content" ref="content">
    <CreateDialog />

    <div class="tiles-container">
      <a
        style="text-decoration:none"
        v-for="tile in tilesToDisplay"
        :key="tile.id"
        :href="tile.url"
      >
        <Tile :name="tile.name" :iconURL="tile.iconURL" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$nuxt.$on("hamburger-button-click", this.toggleContentPosition);
  },
  computed: {
    homeSectionSelected() {
      return this.$store.state.appLogic.homeSectionSelected;
    },
    tilesToDisplay() {
      const filter = this.$store.state.appLogic.searchFilter.toUpperCase();
      if (filter.length == 0) {
        if (this.homeSectionSelected) {
          return this.filterTiles("");
        }
        return this.$store.state.appLogic.selectedCategory.tiles;
      }
      return this.filterTiles(filter);
    },
  },
  methods: {
    filterTiles(filter) {
      let tiles = [];
      const categories = this.$store.state.appLogic.categories;
      categories.forEach((category) => {
        let filteredTiles = category.tiles.filter((tile) => {
          return tile.name.toUpperCase().includes(filter);
        });
        if (filteredTiles.length) tiles = tiles.concat(filteredTiles);
      });
      return tiles;
    },
    toggleContentPosition() {
      if (this.$refs.content.style.marginLeft != "0rem") {
        this.$refs.content.style.marginLeft = "0rem";
      } else {
        this.$refs.content.style.marginLeft = "16rem";
      }
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 4rem;
  margin-left: 16rem;
  padding-top: 2rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f9f9f9;
  width: calc(100vw - 16rem);
  min-height: calc(100vh - 5.7rem);
  transition: ease-in-out, all 0.3s ease-in-out;
}

.search-input-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  transition-delay: 0.15s;
  transition: all 0.2s linear;
}

.search-close-icon {
  visibility: hidden;
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  right: 1.5rem;
  top: 1rem;
  height: 2rem;
  z-index: 100;
  opacity: 0.5;
  transition: all 0.4s linear;
}

.search-close-icon:hover {
  background-color: rgb(228, 228, 228);
}

.search-input {
  border: none;
  height: 3rem;
  font-size: 1.5rem;
  color: rgb(56, 56, 56);
  padding-left: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  outline: none;
  width: 25rem;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.search-input::placeholder {
  opacity: 0.7;
}

.search-input:focus,
.search-input:active {
  width: calc(100vw - 18rem);
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
}

.search-input:focus::placeholder,
.search-input:active::placeholder {
  opacity: 1;
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

<!--
<Content> component will generate:
  - Groups of <Tile> component for tiles of (the selected section) or (tiles that include search filter from all sections)
-->
<template>
  <div
    :class="{ content: true, 'content-when-sidebar-open': sidebarOpen }"
    ref="content"
  >
    <CreateDialog />
    <AccountNoAndRegion v-if="isK2ScriptSelected" />
    <div class="tiles-container">
      <a
        style="text-decoration:none"
        v-for="tile in tilesToDisplay"
        :key="tile.id"
        :href="isK2ScriptSelected ? generateURL(tile.url) : tile.url"
      >
        <Tile
          :name="tile.name"
          :iconURL="tile.iconURL"
          :text="tile.description ? tile.description : ''"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true,
    };
  },
  created() {
    this.$nuxt.$on("hamburger-button-click", this.toggleContentPosition);
  },
  computed: {
    homeSectionSelected() {
      return this.$store.state.appLogic.homeSectionSelected;
    },
    isK2ScriptSelected() {
      return this.$store.getters.isK2ScriptSelected;
    },
    tilesToDisplay() {
      const filter = this.$store.state.appLogic.searchFilter.toUpperCase();
      if (filter.length == 0) {
        if (this.homeSectionSelected) {
          return this.filterTiles("");
        }
        if (this.isK2ScriptSelected) {
          return this.$store.state.appLogic.selectedK2Script.tiles;
        }
        //"My apps" section item is selected
        return this.$store.state.appLogic.selectedSection.tiles;
      }
      return this.filterTiles(filter);
    },
  },
  methods: {
    filterTiles(filter) {
      //Filters tiles based on the section selected(K2Script or My Apps)
      let tiles = [];
      const sections = this.$store.state.appLogic.sections;
      const k2Scripts = this.$store.state.appLogic.k2Scripts;

      const filterFunction = (section) => {
        let filteredTiles = section.tiles.filter((tile) => {
          return tile.name.toUpperCase().includes(filter);
        });
        if (filteredTiles.length) tiles = tiles.concat(filteredTiles);
      };

      if (this.isK2ScriptSelected) k2Scripts.forEach(filterFunction);
      else sections.forEach(filterFunction);
      return tiles;
    },
    toggleContentPosition() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    generateURL(baseURL) {
      const regionCode = this.$store.state.appLogic.selectedRegion.code;
      const accountNo = this.$store.state.appLogic.accountNo;
      return `${baseURL}?accountId=${accountNo}&region=${regionCode}`;
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 4rem;
  margin-left: 0rem;
  padding-top: 2rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f9f9f9;
  width: calc(100vw - 16rem);
  min-height: calc(100vh - 5.7rem);
  transition: ease-in-out, all 0.3s ease-in-out;
}

.content-when-sidebar-open {
  margin-left: 16rem;
}

.tiles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

@media (max-width: 30rem) {
  .content {
    flex-direction: row;
    align-items: center;
    align-content: flex-start;
    align-items: flex-start;

    margin-left: 0rem;
    width: 100%;
  }
  .tiles-container {
    flex-direction: row;
  }
}
</style>

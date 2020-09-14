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
    <!-- <div class="tiles-container">
      <Tile v-for="tile in frequentlyUsedApps" :key="tile.id" :data="tile" />
    </div> -->
    <div class="tiles-container">
      <Tile v-for="tile in tilesToDisplaySorted" :key="tile.id" :data="tile" />
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
export default {
  data() {
    return {
      sidebarOpen: true,
      recognition: null,
      buttonText: "Start",
      listening: false,
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
      return this.$store.getters["appLogic/isK2ScriptSelected"];
    },
    tilesToDisplaySorted() {
      //return this.tilesToDisplay.sort((a, b) => a.name < b.name);
      return this.tilesToDisplay;
    },
    tilesToDisplay() {
      const filter = this.$store.state.appLogic.searchFilter.toUpperCase();
      if (filter.length == 0) {
        if (this.homeSectionSelected) {
          return this.getAllTiles(this.$store.state.appLogic.sections);
        }
        if (this.isK2ScriptSelected) {
          return this.$store.state.appLogic.selectedK2Script.tiles;
        }
        //"My apps" section item is selected
        return this.$store.state.appLogic.selectedSection.tiles;
      }
      return this.filterTiles(filter);
    },
    frequentlyUsedApps() {},
  },
  methods: {
    getAllTiles(e) {
      return e.reduce((tiles, category) => {
        tiles = tiles.concat(category.tiles);
        return tiles;
      }, []);
    },
    filterTiles(filter) {
      //Filters tiles based on the section selected(K2Script or My Apps)
      try {
        const sections = this.$store.state.appLogic.sections;
        const k2Scripts = this.$store.state.appLogic.k2Scripts;
        let tilesToFilter = [];
        let filteredTiles = [];

        if (this.isK2ScriptSelected) {
          tilesToFilter = tilesToFilter.concat(this.getAllTiles(k2Scripts));
        } else {
          tilesToFilter = tilesToFilter.concat(this.getAllTiles(sections));
        }

        const options = {
          keys: ["name", "description"],
          shouldSort: true,
          findAllMatches: true,
        };
        let fuse = new Fuse(tilesToFilter, options);
        let result = fuse.search(filter);
        if (result) {
          filteredTiles = result.map((t) => t.item);
        }
        return filteredTiles;
      } catch (err) {
        console.log(err);
        return [];
      }
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
  margin-top: 3.5rem;
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
  /* background-color: #f9f9f9; */
  background-color: #ffffff;
  width: 100vw;
  padding-right: 16rem;
  min-height: calc(100vh);
  transition: ease-in-out, all 0.3s ease-in-out;
  /* box-shadow: 20px 20px 20px 15px rgb(0, 0, 0, 0.6); */
}

.content-when-sidebar-open {
  margin-left: 16rem;
  width: calc(100vw - 16rem);
  padding-right: 0rem;
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

<!--
<Content> component will generate:
  - Groups of <Tile> component for tiles of (the selected section) or (tiles that include search filter from all sections)
-->
<template>
  <div class="content" ref="content">
    <CreateDialog />
    <div v-if="isK2ScriptSelected" class="account-no-and-region-container">
      <input
        type="text"
        class="account-no-input"
        placeholder="Enter account number"
        v-model="accountNo"
      />
      <select class="region-select" @change="regionSelected($event)">
        <option
          v-for="region in regions"
          :key="region.code"
          :value="region.code"
          >{{ region.name }} {{ region.code }}</option
        >
      </select>
    </div>

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
  created() {
    this.$nuxt.$on("hamburger-button-click", this.toggleContentPosition);
  },
  computed: {
    accountNo: {
      get() {
        return this.$store.state.appLogic.accountNo;
      },
      set(value) {
        this.$store.commit("setAccountNo", value);
      },
    },
    homeSectionSelected() {
      return this.$store.state.appLogic.homeSectionSelected;
    },
    isK2ScriptSelected() {
      return this.$store.getters.isK2ScriptSelected;
    },
    regions() {
      return this.$store.state.appLogic.regions;
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
      if (this.$refs.content.style.marginLeft != "0rem") {
        this.$refs.content.style.marginLeft = "0rem";
      } else {
        this.$refs.content.style.marginLeft = "16rem";
      }
    },
    regionSelected(event) {
      this.$store.dispatch("setSelectedRegion", event.target.value);
    },
    generateURL(baseURL) {
      const regionCode = this.$store.state.appLogic.selectedRegion.code;
      return `${baseURL}?accountId=${this.accountNo}&region=${regionCode}`;
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

.account-no-and-region-container {
  align-self: flex-start;
  width: 80%;
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.account-no-input {
  font-size: 1rem;
  border: none;
  width: 20rem;
  height: 2.5rem;
  margin-right: 1rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgb(221, 221, 221);
  background-color: #ffffff;
  /* background-color: #f2f3f4; */
  outline: none;
  border-radius: 3px;
  transition: all 0.2s linear;
}

.account-no-input:focus {
  background-color: #ffffff;
  box-shadow: 1px 1px 4px 1px rgb(0, 0, 0, 0.2);
}

.region-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #ffffff;
  background-image: url("/down_arrow.png");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 0.5rem);
  background-position-y: 0.8rem;
  background-size: 1rem;
  outline: none;
  font-size: 0.9rem;
  border-radius: 0.2rem;
  border: 1px solid rgb(221, 221, 221);
  height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 1.5rem;
  transition: all 0.2s linear;
}

.region-select:hover {
  box-shadow: 1px 1px 4px 1px rgb(0, 0, 0, 0.2);
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
  justify-content: flex-start;
  align-items: flex-start;
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

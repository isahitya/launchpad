<!--
<Content> component will generate:
  - Groups of <Tile> component for tiles of (the selected category) or (tiles that include search filter from all categories)
-->
<template>
  <div class="content">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create</md-dialog-title>

      <md-tabs @md-changed="tabChanged($event)" md-dynamic-height>
        <md-tab md-label="Category" id="categoryTab">
          <md-field>
            <md-input
              v-model="categoryName"
              placeholder="Enter category name"
            ></md-input>
          </md-field>
        </md-tab>

        <md-tab md-label="Group" id="groupTab">
          <md-field>
            <label for="category">Category</label>
            <md-select v-model="groupCategoryId" name="category">
              <md-option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</md-option
              >
            </md-select>
          </md-field>
          <md-field>
            <md-input
              v-model="groupName"
              placeholder="Enter group name"
            ></md-input>
          </md-field>
        </md-tab>

        <md-tab md-label="App Tile" id="tileTab">
          <md-field>
            <label>Category</label>
            <md-select v-model="tileCategoryId">
              <md-option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</md-option
              >
            </md-select>
          </md-field>
          <md-field>
            <label>Group (optional)</label>
            <md-select
              v-model="tileGroupName"
              :disabled="tileCategoryId.length == 0"
            >
              <md-option
                v-for="groupName in tileGroupNames"
                :key="groupName"
                :value="groupName"
                >{{ groupName }}</md-option
              >
            </md-select>
          </md-field>
          <md-field>
            <md-input
              v-model="tileName"
              placeholder="Application name"
            ></md-input>
          </md-field>
          <md-field>
            <md-input
              v-model="tileURL"
              placeholder="Application URL"
            ></md-input>
          </md-field>
          <md-field>
            <md-input
              v-model="tileIconURL"
              placeholder="Application icon URL (optional)"
            ></md-input>
          </md-field>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="saveButtonClicked()"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <div class="search-icon" @click="searchButtonClick()" ref="searchIcon">
      <img class="search-icon-image" src="~/assets/icons/search.png" />
      <div class="search-icon-background"></div>
    </div>
    <div class="search-input-container" ref="searchInputContainer">
      <input
        class="search-input"
        placeholder="Search"
        ref="searchInput"
        v-model="searchFilter"
      />
      <img
        class="search-close-icon"
        src="~/assets/icons/close.png"
        @click="closeButtonClick()"
        ref="searchCloseIcon"
      />
    </div>
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
  created() {
    this.$nuxt.$on("createButtonClicked", () => {
      this.showDialog = true;
    });
  },
  data() {
    return {
      showDialog: false,
      categoryName: "",
      groupName: "",
      groupCategoryId: "",
      tileCategoryId: "",
      tileGroupName: "",
      tileName: "",
      tileURL: "",
      tileIconURL: "",
    };
  },
  computed: {
    categories() {
      return this.$store.state.appLogic.categories;
    },
    tileGroupNames() {
      if (this.tileCategoryId.length == 0) return [];
      let category = this.$store.state.appLogic.categories.find((c) => {
        return c.id == this.tileCategoryId;
      });
      return Object.keys(category.tiles);
    },
    searchFilter: {
      get() {
        return this.$store.state.appLogic.searchFilter;
      },
      set(value) {
        this.$store.dispatch("setSearchFilter", value);
      },
    },
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
    tabChanged(tabId) {
      this.currentTabId = tabId;
    },
    saveButtonClicked() {
      if (this.currentTabId == "categoryTab") {
        if (this.categoryName.length == 0) {
          alert("Please enter category name");
          return;
        }
        this.$store.dispatch("createCategory", this.categoryName);
        this.categoryName = "";
        this.showDialog = false;
      }
      if (this.currentTabId == "groupTab") {
        if (this.groupCategoryId.length == 0) {
          alert("Please select a category");
          return;
        }
        if (this.groupName.length == 0) {
          alert("Please enter a group name");
          return;
        }
        this.$store.dispatch("createGroup", {
          name: this.groupName,
          categoryId: this.groupCategoryId,
        });
        this.showDialog = false;
      }
      if (this.currentTabId == "tileTab") {
        if (this.tileCategoryId.length == 0) {
          alert("Please select a category");
          return;
        }
        if (this.tileName.length == 0) {
          alert("Please enter application name");
          return;
        }
        if (this.tileURL.length == 0) {
          alert("Please enter application URL");
          return;
        }
        this.$store.dispatch("createTile", {
          name: this.tileName,
          tileURL: this.tileURL,
          categoryId: this.tileCategoryId,
          group: this.tileGroupName,
          iconURL: this.tileIconURL,
        });
        this.showDialog = false;
      }
    },
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
    searchButtonClick() {
      this.$refs.searchIcon.style.opacity = "0";
      this.$refs.searchInputContainer.style.visibility = "visible";
      this.$refs.searchInputContainer.style.opacity = "0.9";
      this.$refs.searchCloseIcon.style.transform = "rotate(0deg)";
      this.$refs.searchInput.focus();
    },
    closeButtonClick() {
      this.$store.dispatch("setSearchFilter", "");
      this.$refs.searchIcon.style.opacity = "0.9";
      this.$refs.searchInputContainer.style.visibility = "hidden";
      this.$refs.searchInputContainer.style.opacity = "0";
      this.$refs.searchCloseIcon.style.transform = "rotate(70deg)";
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 0rem;
  margin-left: 16rem;
  padding-top: 0rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f7f6f6;
  height: 100%;
  width: calc(100vw - 16rem);
  min-height: 100vh;
}

.search-input-container {
  position: relative;
  visibility: hidden;
  width: 100%;
  transition-delay: 0.15s;
  transition: all 0.2s linear;
}

.search-close-icon {
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  right: 2.5rem;
  transform: rotate(45deg);
  top: 1rem;
  height: 2rem;
  z-index: 100;
  transition: all 0.15s linear;
}

.search-close-icon:hover {
  background-color: rgb(228, 228, 228);
}

.search-input {
  border: none;
  height: 3rem;
  font-size: 1.5rem;
  padding-left: 1rem;
  width: calc(100% - 0.5rem);
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.2 linear;
}

.search-icon {
  cursor: pointer;
  position: fixed;
  right: 2rem;
  height: 3rem;
  width: 3rem;
  align-self: flex-end;
  opacity: 0.7;
  margin-top: 0.5rem;
  transition: all 0.1s linear;
}

.search-icon-image {
  height: 2rem;
  opacity: 0.9;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}

.search-icon-background {
  position: absolute;
  top: 0px;
  z-index: -1;
  height: 3rem;
  width: 3rem;
  background: white;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 3px rgb(0, 0, 0, 0.2);
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

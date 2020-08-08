<!--
<Sidebar> component will generate:
  - User profile card
  - Search input field
  - <SidebarItem> for each of the categories
  - A slider(vertical line) displayed next to the selected category item
-->

<template>
  <div class="sidebar unselectable" ref="sidebar">
    <div class="sidebar-items-container">
      <div class="sidebar-heading-container " @click="toggleSidebarAppsItems()">
        <!-- <i class="fa fa-home fa-2x " aria-hidden="true"></i> -->
        <i
          class="fa fa-angle-left fa-2x arrow-icon"
          :class="{ 'rotate-arrow-icon': !myAppsOpen }"
        ></i>
        <h1>My Apps</h1>
        <img
          class="add-icon"
          src="https://img.icons8.com/android/48/000000/plus.png"
          @click="createButtonClicked()"
        />
      </div>
      <div
        :class="{
          'hide-sidebar-items': myAppsOpen,
        }"
      >
        <SidebarItem
          text="Home"
          iconURL="/home.png"
          :highlight="homeSectionSelected == true"
          @click.native="homeSectionClicked()"
        />
        <SidebarItem
          v-for="item in categories"
          :key="item.id"
          :text="item.name"
          :iconURL="item.iconURL"
          :highlight="item.id == selectedCategory.id"
          :tileCount="getTileCount(item.id)"
          @click.native="sidebarItemSelected(item.id)"
          :ref="item.id"
        />
      </div>
      <div class="sidebar-separator"></div>
      <div
        class="sidebar-heading-container "
        @click="toggleSidebarK2ScriptsItems()"
      >
        <!-- <i class="fa fa-home fa-2x " aria-hidden="true"></i> -->
        <i
          class="fa fa-angle-left fa-2x arrow-icon"
          :class="{ 'rotate-arrow-icon': k2ScriptsOpen }"
        ></i>
        <h1>K2 Scripts</h1>
        <img
          class="add-icon"
          src="https://img.icons8.com/android/48/000000/plus.png"
          @click="createButtonClicked()"
        />
      </div>
      <div
        :class="{
          'hide-sidebar-items': myAppsOpen,
        }"
      ></div>
    </div>

    <div class="slider" ref="slider">
      <img src="~/assets/icons/arrow.png" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$nuxt.$on("hamburger-button-click", this.toggleSidebar);
  },
  data() {
    return {
      myAppsOpen: true,
      k2ScriptsOpen: true,
    };
  },
  computed: {
    homeSectionSelected() {
      return this.$store.state.appLogic.homeSectionSelected;
    },
    searchFilter: {
      get() {
        return this.$store.state.appLogic.searchFilter;
      },
      set(value) {
        this.$store.dispatch("setSearchFilter", value);
      },
    },
    categories() {
      return this.$store.state.appLogic.categories;
    },
    selectedCategory() {
      return this.$store.state.appLogic.selectedCategory;
    },
  },
  mounted() {
    //this.moveSlider(this.$store.state.appLogic.selectedCategory._id);
  },
  methods: {
    getTileCount(categoryId) {
      let category = this.$store.state.appLogic.categories.find(
        (c) => c.id == categoryId
      );
      return category ? category.tiles.length : 0;
    },
    homeSectionClicked() {
      this.$store.state.appLogic.homeSectionSelected = true;
      this.$store.dispatch("setSearchFilter", "");
      this.$store.dispatch("setSelectedCategory", null);
    },
    sidebarItemSelected(itemId) {
      this.$store.state.appLogic.homeSectionSelected = false;
      this.$store.dispatch("setSearchFilter", "");
      this.$store.dispatch("setSelectedCategory", itemId);
      this.moveSlider(itemId);
    },
    createButtonClicked() {
      $nuxt.$emit("createButtonClicked");
    },
    moveSlider(itemId) {
      let sidebarItemRect = this.$refs[itemId][0].$el.getBoundingClientRect();
      let sidebarRect = this.$el.getBoundingClientRect();
      let sliderNewY = sidebarItemRect.y - sidebarRect.y;
      this.$refs.slider.style.top = `${sliderNewY}px`;
    },
    toggleSidebar() {
      if (!this.$refs.sidebar) {
        console.log("Fix this case");
        return;
      }
      if (this.$refs.sidebar.style.visibility == "hidden") {
        this.$refs.sidebar.style.visibility = "visible";
        this.$refs.sidebar.style.marginLeft = "0rem";
      } else {
        this.$refs.sidebar.style.marginLeft = "-16rem";
        this.$refs.sidebar.style.visibility = "hidden";
      }
    },
    toggleSidebarAppsItems() {
      this.myAppsOpen = !this.myAppsOpen;
    },
    toggleSidebarK2ScriptsItems() {
      this.k2ScriptsOpen = !this.k2ScriptsOpen;
    },
  },
};
</script>

<style>
.sidebar {
  margin-top: 3.7rem;
  padding-top: 1rem;
  top: 0rem;
  display: flex;
  position: fixed;
  width: 16rem;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f5f5;
  visibility: visible;
  transition: ease-in-out, all 0.3s ease-in-out;
  /* box-shadow: 1.5px 2px 2px 1px rgb(0, 0, 0, 0.2); */
}

.sidebar-heading-container {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  cursor: pointer;
}

.sidebar-heading-container h1 {
  margin-left: 1rem;
  margin-right: auto;
}

.sidebar-heading-container i:first-child {
  opacity: 0.9;
  margin-top: 0.1rem;
  margin-left: 1rem;

  vertical-align: middle !important;
}

.sidebar-separator {
  margin-top: 1rem;
  height: 1px;
  background-color: rgb(218, 218, 218);
}

.arrow-icon {
  margin-left: 1rem !important;
  margin-top: 0.4rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: ease-in-out, all 0.2s ease-in-out;

  transform: rotate(-180deg);
}

.add-icon {
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.8;
  transition: all 0.2s linear;
  height: 1.45rem !important;
  margin-left: auto;
  margin-right: 0.5rem;
  padding: 0.1rem;
}

.add-icon:hover {
  background: rgb(212, 212, 212);
}

.sidebar-items-container {
  position: relative;
  z-index: 100;
  width: 100%;
  height: calc(100vh - 18rem);
  /* box-shadow: 0px -1.5px 4px rgba(0, 0, 0, 0.25); */
}

.rotate-arrow-icon {
  transform: rotate(-90deg);
}

.hide-sidebar-items .sidebar-item {
  /*sidebar-item class is in SidebarItem component*/
  opacity: 0;
  height: 0rem;
  visibility: hidden;
}

.hide-sidebar-items .selected-item {
  opacity: 1;
  height: 2.3rem;
  visibility: visible;
}

.sidebar-items-container-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}

.sidebar-items-container-heading img {
  display: flex;
  justify-content: space-between;
  height: 2rem;
  margin-right: 0.5rem;
  opacity: 0.7;
}

.sidebar-items-container h1:first-child {
  margin-left: 1.5rem;
}

.sidebar-items-container hr {
  opacity: 0.5;
  margin: 0rem;
}

.sidebar-items-container h1 {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  color: #2e2e2e;
}

.slider {
  display: none;
  opacity: 0.7;
  position: absolute;
  z-index: 100;
  width: 2rem;
  height: 3rem;
  left: 1rem;
  transition: all 0.2s ease-in-out;
  margin: 0px;
}

.slider img {
  margin-top: 0.2rem;
  width: 2rem;
}

@media (max-width: 30rem) {
  .sidebar {
    display: none;
  }
}
</style>

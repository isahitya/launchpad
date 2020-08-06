<!--
<Sidebar> component will generate:
  - User profile card
  - Search input field
  - <SidebarItem> for each of the categories
  - A slider(vertical line) displayed next to the selected category item
-->

<template>
  <div class="sidebar" ref="sidebar">
    <div
      :class="{
        'sidebar-items-container': true,
        'hide-sidebar-items': hideSidebarItems,
      }"
    >
      <div class="my-apps-container" @click="toggleSidebarItems()">
        <i class="fa fa-home fa-2x home-icon" aria-hidden="true"></i>
        <h1>My Apps</h1>
        <i
          class="fa fa-angle-left fa-2x arrow-icon"
          :class="{ 'rotate-arrow-icon': !hideSidebarItems }"
        ></i>
      </div>
      <SidebarItem
        v-for="item in categories"
        :key="item.id"
        :text="item.name"
        :iconURL="item.iconURL"
        :highlight="item.id == selectedCategory.id"
        @click.native="sidebarItemSelected(item.id)"
        :ref="item.id"
      />
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
      hideSidebarItems: false,
    };
  },
  computed: {
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
    this.moveSlider(this.$store.state.appLogic.selectedCategory.id);
  },
  methods: {
    sidebarItemSelected(itemId) {
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
      if (this.$refs.sidebar.style.visibility == "hidden") {
        this.$refs.sidebar.style.visibility = "visible";
        this.$refs.sidebar.style.marginLeft = "0rem";
      } else {
        this.$refs.sidebar.style.marginLeft = "-16rem";
        this.$refs.sidebar.style.visibility = "hidden";
      }
    },
    toggleSidebarItems() {
      this.hideSidebarItems = !this.hideSidebarItems;
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
  background-color: #ffffff;
  visibility: visible;
  transition: ease-in-out, all 0.3s ease-in-out;
  /* box-shadow: 1.5px 2px 2px 1px rgb(0, 0, 0, 0.2); */
}

.my-apps-container {
  display: flex;
  margin-right: 0.5rem;
  cursor: pointer;
}

.my-apps-container h1 {
  margin-left: 1rem;
}

.home-icon {
  opacity: 0.9;
  margin-left: 1rem;
  margin-top: 0.4rem;
  vertical-align: middle !important;
}

.arrow-icon {
  margin-left: auto !important;
  margin-top: 0.4rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: ease-in-out, all 0.2s ease-in-out;
}

.welcome-headline {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.25rem;
  /* identical to box height */
  color: #202020;
  margin-top: 1.5rem;
  margin-bottom: 0rem;
}

.welcome-subheading {
  font-family: Roboto;
  font-style: italic;
  font-weight: normal;
  font-size: 1rem;
  color: #494949;
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

.create-button {
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s linear;
}

.create-button:hover {
  background: rgb(212, 212, 212);
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

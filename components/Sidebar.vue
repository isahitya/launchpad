<!--
<Sidebar> component will generate:
  - User profile card
  - Search input field
  - <SidebarItem> for each of the categories
  - A slider(vertical line) displayed next to the selected category item
-->

<template>
  <div class="sidebar">
    <div class="profile">
      <div class="hero">
        <h1>Launchpad</h1>
        <img src="~/assets/icons/rocket_icon.png" />
      </div>
      <img class="profile-image" src="~/assets/profile_image.jpeg" />
      <h1 class="welcome-headline ">Welcome Harshit</h1>
      <h1 class="welcome-subheading">Seize the day!</h1>
    </div>

    <div class="sidebar-items-container">
      <div class="sidebar-items-container-heading">
        <h1>Categories</h1>
        <img
          class="create-button"
          src="~/assets/icons/add.png"
          @click="createButtonClicked()"
        />
      </div>
      <hr />
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
  },
};
</script>

<style>
.sidebar {
  margin-top: 0rem;
  top: 0rem;
  display: flex;
  position: fixed;
  width: 16rem;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 1.5px 2px 2px 1px rgb(0, 0, 0, 0.2);
}

.profile {
  position: relative;
  overflow: hidden;
  margin: 0px;
  height: 22rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #e0f1ff;
}

.hero {
  height: 3rem;
  display: flex;
  align-items: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-family: Roboto;
  font-style: italic;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 33px;
  /* identical to box height */
  color: #333333;
  margin: 0rem;
  margin-right: 0.5rem;
}

.hero img {
  height: 2rem;
  margin-top: 0.25rem;
  align-self: flex-start;
}

.profile-image {
  filter: drop-shadow(4px 6px 4px rgba(0, 0, 0, 0.3));
  width: 7rem;
  border-radius: 50%;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
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
  box-shadow: 0px -1.5px 4px rgba(0, 0, 0, 0.25);
}

.create-button {
  cursor: pointer;
}

.sidebar-items-container-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  position: absolute;
  z-index: 100;
  width: 2rem;
  height: 3rem;
  left: 1rem;
  transition: all 0.15s ease-in-out;
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

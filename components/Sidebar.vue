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
      <img class="profile-image" src="~/assets/profile_image.jpeg" />
      <h1 class="welcome-heading">Welcome Harshit</h1>
      <div class="search">
        <img class="search-icon" src="~/assets/icons/search.png" />
        <input
          class="search-input"
          type="text"
          placeholder="Search"
          v-model="searchFilter"
        />
      </div>
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
    <div class="slider" ref="slider"></div>
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
  display: flex;
  position: fixed;
  width: 16rem;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 1px rgb(0, 0, 0, 0.2);
}

.profile {
  margin: 0px;
  background-color: #232f3e;
  height: 19rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.profile-image {
  width: 7rem;
  border-radius: 50%;
  box-shadow: 1px 2px 3px 3px rgb(0, 0, 0, 0.5);
  margin-top: 4rem;
}

.welcome-heading {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(245, 245, 245);
  margin: 0px;
  margin-top: 2rem;
}

.search {
  margin-top: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.search-icon {
  height: 1rem;
  top: 0.8rem;
  left: 1.2rem;
  opacity: 0.5;
  position: absolute;
}

.search-input {
  -webkit-appearance: none;
  background-color: #e2e3e6;
  appearance: none;
  border-radius: 3px;
  width: calc(100% - 2rem);
  height: 1.5rem;
  border: none;
  margin-top: 0.5rem;
  padding-left: 1.3rem;
  outline: none;
}

.slider {
  position: absolute;
  background-color: #252f3d;
  width: 0.5rem;
  height: 3rem;
  left: 0rem;
  transition: all 0.15s ease-in-out;
  margin: 0px;
}

@media (max-width: 30rem) {
  .sidebar {
    display: none;
  }
}
</style>

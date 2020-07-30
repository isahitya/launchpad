<!--
<Sidebar> component will generate:
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
        <input class="search-input" type="text" placeholder="Search" />
      </div>
    </div>

    <SidebarItem
      v-for="item in sidebarItems"
      :key="item.id"
      :text="item.text"
      :iconURL="item.iconURL"
      :highlight="item.id == 1"
      @click.native="sidebarItemSelected(item.id)"
      :ref="item.id"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: [
        {
          id: "1",
          text: "K2 Scripts",
          iconURL: require("~/assets/icons/tag_icon.png"),
        },
        {
          id: "2",
          text: "Application",
          iconURL: require("~/assets/icons/apps.png"),
        },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },

  methods: {
    sidebarItemSelected() {
      moveSlider(itemId);
    },
    moveSlider(itemId) {
      let sidebarItemRect = this.$refs[itemId][0].$el.getBoundingClientRect();
      let sidebarRect = this.$el.getBoundingClientRect();
      let sliderNewY = sidebarItemRect.y - sidebarRect.y;
      this.$refs.slider.style.top = `${sliderNewY + 8}px`;
    },
  },
};
</script>

<style>
.sidebar {
  margin-top: 0rem;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
}

.profile {
  margin: 0px;
  background: #232f3e;
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
  display: none;
  position: absolute;
  background-color: rgb(77, 77, 77);
  width: 2px;
  height: 1.5rem;
  top: 2rem;
  transition: all 0.25s ease-in-out;
  margin-left: 3rem;
}

@media (max-width: 30rem) {
  .sidebar {
    display: none;
  }
}
</style>

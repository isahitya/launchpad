<!--
<Sidebar> component will generate:
  - <SidebarItem> for each of the categories
  - A slider(vertical line) displayed next to the selected category item
-->

<template>
  <div class="sidebar">
    <SidebarItem
      v-for="category in categories"
      :key="category.id"
      :text="category.name"
      :highlight="category.id == selectedCategory.id"
      @click.native="categorySelected(category.id)"
      :ref="category.id"
    />
    <div class="slider" ref="slider"></div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },

  methods: {
    categorySelected(categoryId) {
      this.$store.dispatch("setSearchFilter", "");
      this.$store.dispatch("setSelectedCategory", categoryId);
      this.moveSlider(categoryId);
    },
    moveSlider(categoryId) {
      let sidebarItemRect = this.$refs[
        categoryId
      ][0].$el.getBoundingClientRect();
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
  padding-top: 1.5rem;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
}

.slider {
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

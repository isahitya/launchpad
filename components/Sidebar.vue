<template>
  <div class="app-sidebar">
    <SidebarItem
      v-for="category in categories"
      :key="category.id"
      :text="category.name"
      :highlighted="category.id == selectedCategory.id"
      @click.native="selectCategory(category.id)"
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
    selectCategory(categoryId) {
      this.$store.dispatch("setSearchFilter", "");
      this.$store.dispatch("setSelectedCategory", categoryId);
      this.animateSlider(categoryId);
    },
    animateSlider(categoryId) {
      let selectedElementRect = this.$refs[
        categoryId
      ][0].$el.getBoundingClientRect();
      let sidebarRect = this.$el.getBoundingClientRect();
      let sliderNewY = selectedElementRect.y - sidebarRect.y;
      this.$refs.slider.style.top = `${sliderNewY + 8}px`;
    },
  },
};
</script>

<style>
.app-sidebar {
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
  background-color: black;
  width: 1.5px;
  height: 1.5rem;
  top: 2rem;
  transition: all 0.3s ease;
  margin-left: 2rem;
}

@media (max-width: 30rem) {
  .app-sidebar {
    display: none;
  }
}
</style>

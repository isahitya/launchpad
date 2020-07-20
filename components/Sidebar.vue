<template>
  <div class="app-sidebar">
    <SidebarItem
      v-for="category in categories"
      :key="category.id"
      :text="category.name"
      :highlighted="category.id == selectedCategory.id"
      @click.native="selectCategory(category.id)"
    />
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
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.$store.dispatch("setSearchFilter", "");
      this.$store.dispatch("setSelectedCategory", categoryId);
    }
  }
};
</script>

<style>
.app-sidebar {
  margin-top: 0rem;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
}

@media (max-width: 30rem) {
  .app-sidebar {
    display: none;
  }
}
</style>


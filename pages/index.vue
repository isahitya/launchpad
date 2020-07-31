<!--
  - Main page of the app
  - Contains 3 components: navbar, sidebar, content
-->

<template>
  <div class="container">
    <Navbar />
    <div class="sidebar-and-content-grid">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>

<script>
export default {
  fetch() {},
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.sidebar-and-content-grid {
  margin-top: 3rem;
  height: 100vh;
  display: grid;
  grid-template-columns: 16rem calc(100vw - 16rem);
}
</style>

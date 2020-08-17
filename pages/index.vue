<!--
  - Main page of the app
  - Contains 3 components: navbar, sidebar, content
-->

<template>
  <div class="container">
    <Navbar />
    <Sidebar />
    <Content />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  fetch() {},
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>

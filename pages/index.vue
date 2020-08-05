<!--
  - Main page of the app
  - Contains 3 components: navbar, sidebar, content
-->

<template>
  <div class="container">
    <Sidebar />
    <Content />
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
</style>

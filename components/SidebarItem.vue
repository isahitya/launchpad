<!--
<SidebarItem> component will generate:
  - header for the category name
  - styling for the highlighted item
-->

<template>
  <div
    :class="{
      'sidebar-item': true,
      'highlighted-item': highlight == true,
    }"
  >
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: { text: String, highlight: Boolean },
};
</script>

<style>
.sidebar-item {
  margin-bottom: 1.5rem;
  height: 3rem;
  width: 12rem;
  border-radius: 5px;
  transition: background-color 0.2s linear;
}
.sidebar-item:hover {
  background-color: rgb(248, 248, 248);
}

.sidebar-item h1 {
  vertical-align: middle;
  margin-left: 0.8rem;
  font-weight: 400;
  font-size: 1rem;
  color: rgb(55, 55, 55);
}

.sidebar-item h1:hover {
  cursor: pointer;
  color: black;
}

.highlighted-item h1 {
  color: #f58435;
  font-weight: 500;
}

.highlighted-item h1:hover {
  color: #f58435;
}
</style>

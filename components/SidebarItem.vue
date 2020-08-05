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
  props: { text: String, highlight: Boolean, iconURL: String },
};
</script>

<style>
.sidebar-item {
  margin-bottom: 0.5rem;
  height: 2.5rem;
  width: 100%;
  transition: background-color 0.2s linear;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.sidebar-item:hover {
  background-color: #457b9d;
}

.sidebar-item-icon {
  height: 1.5rem;
  margin-left: 1.5rem;
}

.sidebar-item h1 {
  vertical-align: middle;
  margin-left: 3.5rem !important;
  color: #000000;
  /* font-weight: 500;
  font-size: 1rem;
  color: rgb(31, 30, 30); */
}

.sidebar-item h1:hover {
  cursor: pointer;
  color: #161616;
}

.highlighted {
  background-color: #5c677d;
}

.highlighted-item h1 {
  font-weight: 400;
}
</style>

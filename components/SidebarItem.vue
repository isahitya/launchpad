<!--
<SidebarItem> component will generate:
  - header for the section name
  - styling for the highlighted item
-->

<template>
  <div
    :class="{
      'sidebar-item': true,
      'selected-item': highlight == true,
    }"
  >
    <img :src="iconURL" />
    <h1>{{ text }}</h1>
    <span class="tile-count">{{ tileCount }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    highlight: Boolean,
    iconURL: String,
    tileCount: Number,
  },
};
</script>

<style>
.sidebar-item {
  margin-right: 1.5rem;
  height: 2rem;
  border-radius: 0px 0.3rem 0.3rem 0px;

  /* width: 100%; */
  transition: background-color 0.2s linear;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: ease-in-out, all 0.2s ease-in-out;
}

.sidebar-item img {
  height: 1.5rem;
  margin-left: 3.5rem;
}

.sidebar-item:hover {
  background-color: #dadada;
}

.sidebar-item-icon {
  height: 1.5rem;
  margin-left: 1.5rem;
}

.sidebar-item h1 {
  vertical-align: middle;
  margin-left: 0.5rem;
  color: #000000;
  /* font-weight: 500;
  font-size: 1rem;
  color: rgb(31, 30, 30); */
}

.sidebar-item h1:hover {
  cursor: pointer;
}

.selected-item {
  background-color: #3773ae !important;
}

.selected-item h1 {
  font-weight: 400;
  color: white;
}

.tile-count {
  font-weight: 500;
  font-size: 0.9rem;
  margin-left: auto;
  margin-right: 0.5rem;
  background-color: #999999;
  color: white;
  width: 1.75rem;
  border-radius: 45%;
  text-align: center;
}

.selected-item .tile-count {
  background-color: white;
  color: #3773ae;
}

.selected-item img {
  filter: invert(1);
}
</style>

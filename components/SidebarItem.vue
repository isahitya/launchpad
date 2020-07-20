<template>
  <div
    v-bind:class="{
      'sidebar-item': true,
      'highlighted-item': highlighted == true,
    }"
  >
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  props: { text: String, highlighted: Boolean },
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
  background-color: rgb(245, 245, 245);
}

.sidebar-item h1:hover {
  cursor: pointer;
}

.sidebar-item h1 {
  vertical-align: middle;
  margin-left: 0.8rem;
  font-weight: 400;
  font-size: 1rem;
  color: rgb(0, 0, 0);
}

.highlighted-item {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.highlighted-item h1 {
  color: #f58435;
  font-weight: 500;
}
</style>

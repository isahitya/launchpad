<template>
  <div class="tile">
    <h1 class="tile-heading">{{ name }}</h1>
    <hr class="separator" />
    <h1 class="tile-text">{{ description }}</h1>
  </div>
</template>

<script>
export default {
  props: ["name", "description"]
};
</script>

<style>
.tile {
  background-color: white;
  box-shadow: 1px 1px 1px 0px rgb(0, 0, 0, 0.1);
  border: 1px solid rgb(184, 184, 184);
  border-radius: 5px;
  width: 15rem;
  height: 6rem;
  margin: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0rem;
  transition: box-shadow 0.2s linear;
}

.tile:hover {
  cursor: pointer;
  box-shadow: 0px 2px 4px 3px rgb(0, 0, 0, 0.5);
}

.tile-heading {
  margin: 0.2rem;
  margin-left: 0.5rem;
  margin-right: 2rem;
  font-weight: 400;
  font-size: 1rem;
  color: rgb(100, 100, 100);
}

.separator {
  border: none;
  border-top: 1px solid rgb(185, 185, 185);
}

.tile-text {
  margin-left: 0.5rem;
  margin-right: 2rem;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgb(75, 75, 75);
}
</style>


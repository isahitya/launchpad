<!--
<Tile> component will generate-
  - Heading of the tile, separator and icon.
  - Styling: Shadow for the tile, hover effect.
-->

<template>
  <div class="tile md-elevation-5">
    <img
      class="tile-icon"
      :src="iconURL.length != 0 ? iconURL : defaultIconURL"
    />
    <hr class="separator" />
    <h1 class="tile-heading">{{ name }}</h1>
  </div>
</template>

<script>
export default {
  props: ["name", "iconURL"],
  data() {
    return {
      defaultIconURL: "/tiles/default_icon.png",
    };
  },
};
</script>

<style>
.tile {
  /* background-color: white;
  box-shadow: 0px 2px 3px 1px rgb(0, 0, 0, 0.4); 
  border: 1px solid rgb(184, 184, 184);
  */

  border-radius: 2px;
  width: 7rem;
  height: 9.5rem;
  margin: 1.5rem;
  transition: box-shadow 0.2s linear;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.25s ease;
}

.tile:hover {
  cursor: pointer;
  /* box-shadow: 0px 2px 4px 3px rgb(0, 0, 0, 0.5); */
  border-color: #f58435;

  transform: scale(1.1);
}

.tile:hover .tile-heading {
  color: rgb(65, 65, 65);
}

.tile-icon {
  height: 3rem !important;
  margin-top: 2.5rem;
  margin-bottom: 1.9rem;
}

.tile-heading {
  margin: 0.3rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 400;
  font-size: 0.85rem;
  color: rgb(32, 32, 32);
}

.separator {
  margin: 0px;
  border: none;
  border-top: 1.5px solid rgb(212, 212, 212);
  height: 1px;
  width: 100%;
}

.tile-text {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgb(75, 75, 75);
}
</style>

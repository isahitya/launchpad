<!--
<Tile> component will generate-
  - Heading of the tile, separator and (icon or descripting).
  - Styling: Shadow for the tile, hover effect.
-->

<template>
  <div
    v-if="!showK2Tile"
    class="tile md-elevation-5"
    @click="tileClick($event)"
  >
    <img
      class="tile-delete-icon"
      id="deleteButton"
      :class="{ 'hide-tile-delete-icon': !editMode }"
      src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"
      @click="deleteTile()"
    />
    <img
      class="tile-icon"
      :src="iconURL.length != 0 ? iconURL : defaultIconURL"
    />
    <hr class="separator" />
    <h1 class="tile-heading">{{ name }}</h1>
  </div>
  <div v-else class="tile tile-wide md-elevation-5">
    <h1 class="tile-heading">{{ name }}</h1>
    <hr class="separator" />
    <h1 class="tile-text">{{ text }}</h1>
  </div>
</template>

<script>
import metafetch from "metafetch";

export default {
  props: ["data"],
  data() {
    return {
      defaultIconURL: "/tiles/default_icon.png",
      editMode: false,
      name: this.data.name,
      text: this.data.text,
      iconURL: this.data.iconURL,
      tileURL: this.data.url,
    };
  },
  computed: {
    showK2Tile() {
      return this.$store.getters["appLogic/isK2ScriptSelected"];
    },
  },
  created() {
    this.$nuxt.$on("toggle-edit-mode", () => {
      this.editMode = !this.editMode;
    });
    //this.fetchPageName(this.data.url).then((name) => console.log(name));
  },
  methods: {
    deleteTile() {
      this.$store.dispatch("appLogic/deleteTile", this.data);
    },
    tileClick(event) {
      if (event.target.id == "deleteButton") {
        return;
      }
      window.open(this.tileURL);
    },

    // async fetchPageName(url) {
    //   let name = null;
    //   const meta = await metafetch.fetch(url);
    //   if (!meta) {
    //     return null;
    //   }
    //   if (meta.siteName) {
    //     name = meta.siteName;
    //   } else if (meta.keywords) {
    //     name = meta.keywords.split(",")[0];
    //   } else if (meta.Keywords) {
    //     name = meta.Keywords.split(",")[0];
    //   } else if (meta.meta.keywords) {
    //     name = meta.meta.keywords.split(",")[0];
    //   } else if (meta.meta.Keywords) {
    //     name = meta.meta.Keywords.split(",")[0];
    //   } else if (meta.title) {
    //     name = meta.title;
    //   } else if (meta.url) {
    //     name = meta.url;
    //   }
    //   return name;
    // },
  },
};
</script>

<style>
/* Only tile class is used for tiles in 'My Apps'.
Both tile and tile-wide class are used for tiles in 'K2Scripts' */

.tile {
  position: relative;
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

.tile-delete-icon {
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  height: 1rem;
  width: 1rem;
  z-index: 1;
}

.hide-tile-delete-icon {
  display: none;
}

.tile-wide {
  width: 15rem;
  height: 6.5rem;
  align-items: flex-start;
}

.tile:hover {
  cursor: pointer;
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

.tile-wide .tile-heading {
  margin-right: auto;
}

.separator {
  margin: 0px;
  border: none;
  border-top: 1.5px solid rgb(212, 212, 212);
  height: 1px;
  width: 100%;
}

.tile-wide .separator {
  border-top: 1.5px solid rgb(225, 225, 225);
}

.tile-text {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgb(75, 75, 75);
}
</style>

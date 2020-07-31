<!--
<Content> component will generate:
  - <Tile> component for tiles of the selected category
-->
<template>
  <div class="content">
    <div
      class="category-container"
      v-for="tileCategory in tileCategories"
      :key="tileCategory.id"
    >
      <h1>{{ tileCategory.name }}</h1>
      <div class="tiles-container">
        <a
          style="text-decoration:none"
          v-for="tile in tileCategory.tiles"
          :key="tile.id"
          :href="createURL(tile.baseURL)"
        >
          <Tile :name="tile.name" :iconURL="tile.iconURL" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tileCategories() {
      return [
        {
          id: "1",
          name: "Recently Used",
          tiles: [
            {
              name: "WorkDocs",
              iconURL: require("~/assets/icons/tiles/google_docs.png"),
            },
            {
              name: "Quip",
              iconURL: require("~/assets/icons/tiles/quip.png"),
            },
            {
              name: "Payroll",
              iconURL: require("~/assets/icons/tiles/payroll.png"),
            },
          ],
        },
        {
          id: "2",
          name: "Work",
          tiles: [
            {
              name: "Taminator",
              iconURL: require("~/assets/icons/tiles/robot_arm.png"),
            },
            {
              name: "Cost Explorer",
              iconURL: require("~/assets/icons/tiles/cost_explorer.png"),
            },
            {
              name: "Paragon",
              iconURL: require("~/assets/icons/tiles/paragon.png"),
            },
            {
              name: "Phone Tool",
              iconURL: require("~/assets/icons/tiles/phone_tool.png"),
            },
          ],
        },
        {
          id: "3",
          name: "HR",
          tiles: [
            {
              name: "Payroll",
              iconURL: require("~/assets/icons/tiles/payroll.png"),
            },
            {
              name: "Benefits",
              iconURL: require("~/assets/icons/tiles/benefits.png"),
            },
            {
              name: "TAM Wiki",
              iconURL: require("~/assets/icons/tiles/wikipedia.png"),
            },
          ],
        },
      ];
    },
  },
  methods: {
    createURL(baseURL) {
      return (
        baseURL +
        "?" +
        "accountId=" +
        this.$store.state.accountNumber +
        "&region=" +
        this.$store.state.selectedRegion.code
      );
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 0rem;
  padding-top: 3rem;
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #f7f6f6;
  height: 100%;
}

.category-container {
  width: 100%;
  margin-bottom: 1.5rem;
}

.category-container > h1 {
  font-size: 0.8rem;
  font-weight: 400;
  color: rgb(83, 83, 83);
  margin: 0px;
  margin-left: 1rem;
}

.tiles-container {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .content {
    flex-direction: column;
    align-items: center;
    align-content: center;
    grid-template-columns: 100vw;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
}
</style>

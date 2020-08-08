<template>
  <md-dialog :md-active.sync="showDialog" class="create-dialog">
    <md-dialog-title>Create</md-dialog-title>

    <md-tabs @md-changed="tabChanged($event)" md-dynamic-height>
      <md-tab md-label="Category" id="categoryTab">
        <md-field>
          <label>Category name</label>
          <md-input v-model="categoryName"></md-input>
        </md-field>
      </md-tab>

      <md-tab md-label="App Tile" id="tileTab">
        <md-field>
          <label>Category</label>
          <md-select v-model="tileCategoryId">
            <md-option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</md-option
            >
          </md-select>
        </md-field>
        <md-field>
          <label>Application name</label>
          <md-input v-model="tileName"></md-input>
        </md-field>
        <md-field>
          <label>Application URL</label>
          <md-input v-model="tileURL"></md-input>
        </md-field>
        <md-field
          ><label>Application icon URL (optional)</label>
          <md-input v-model="tileIconURL"></md-input>
        </md-field>
      </md-tab>
    </md-tabs>

    <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false"
        >Close</md-button
      >
      <md-button class="md-primary" @click="saveButtonClicked()"
        >Save</md-button
      >
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  created() {
    this.$nuxt.$on("createButtonClicked", () => {
      this.showDialog = true;
    });
  },
  data() {
    return {
      showDialog: false,
      categoryName: "",
      tileCategoryId: "",
      tileName: "",
      tileURL: "",
      tileIconURL: "",
    };
  },
  computed: {
    categories() {
      return this.$store.state.appLogic.categories;
    },
  },
  methods: {
    tabChanged(tabId) {
      this.currentTabId = tabId;
    },
    saveButtonClicked() {
      if (this.currentTabId == "categoryTab") {
        if (this.categoryName.length == 0) {
          alert("Please enter category name");
          return;
        }
        this.$store.dispatch("createCategory", this.categoryName);
        this.categoryName = "";
        this.showDialog = false;
      }
      if (this.currentTabId == "tileTab") {
        if (this.tileCategoryId.length == 0) {
          alert("Please select a category");
          return;
        }
        if (this.tileName.length == 0) {
          alert("Please enter application name");
          return;
        }
        if (this.tileURL.length == 0) {
          alert("Please enter application URL");
          return;
        }
        this.tileURL =
          this.tileURL.startsWith("http://") ||
          this.tileURL.startsWith("https://")
            ? this.tileURL
            : "https://" + this.tileURL;

        this.$store.dispatch("createTile", {
          name: this.tileName,
          tileURL: this.tileURL,
          categoryId: this.tileCategoryId,
          iconURL: this.tileIconURL,
        });
        this.showDialog = false;
      }
      this.clearFields();
    },
    clearFields() {
      this.categoryName = "";
      this.tileCategoryId = "";
      this.tileName = "";
      this.tileURL = "";
      this.tileIconURL = "";
    },
  },
};
</script>

<style></style>

<template>
  <md-dialog :md-active.sync="showDialog" class="create-dialog">
    <md-dialog-title>Create</md-dialog-title>

    <md-tabs @md-changed="tabChanged($event)" md-dynamic-height>
      <md-tab md-label="App Tile" id="tileTab">
        <md-field>
          <label>Section</label>
          <md-select v-model="tileSectionId">
            <md-option
              v-for="section in sections"
              :key="section.id"
              :value="section.id"
              >{{ section.name }}</md-option
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
      <md-tab md-label="Section" id="sectionTab">
        <md-field>
          <label>Section name</label>
          <md-input v-model="sectionName"></md-input>
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
      sectionName: "",
      tileSectionId: "",
      tileName: "",
      tileURL: "",
      tileIconURL: "",
    };
  },
  computed: {
    sections() {
      return this.$store.state.appLogic.sections;
    },
  },
  methods: {
    tabChanged(tabId) {
      this.currentTabId = tabId;
    },
    saveButtonClicked() {
      if (this.currentTabId == "sectionTab") {
        if (this.sectionName.length == 0) {
          alert("Please enter section name");
          return;
        }
        this.$store.dispatch("createSection", this.sectionName);
        this.sectionName = "";
        this.showDialog = false;
      }
      if (this.currentTabId == "tileTab") {
        if (this.tileSectionId.length == 0) {
          alert("Please select a section");
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
          sectionId: this.tileSectionId,
          iconURL: this.tileIconURL,
        });
        this.showDialog = false;
      }
      this.clearFields();
    },
    clearFields() {
      this.sectionName = "";
      this.tileSectionId = "";
      this.tileName = "";
      this.tileURL = "";
      this.tileIconURL = "";
    },
  },
};
</script>

<style></style>

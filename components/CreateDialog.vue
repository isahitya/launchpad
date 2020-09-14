<template>
  <md-dialog :md-active.sync="showDialog" class="create-dialog">
    <md-dialog-title>Create</md-dialog-title>

    <md-tabs @md-changed="tabChanged($event)" md-dynamic-height>
      <md-tab md-label="App Tile" id="tileTab">
        <md-field :class="{ 'md-invalid': showSelectSectionError }">
          <label>Section</label>
          <md-select
            v-model="tileSectionId"
            required
            @md-selected="showSelectSectionError = false"
          >
            <md-option
              v-for="section in sections"
              :key="section.id"
              :value="section.id"
              >{{ section.name }}</md-option
            >
          </md-select>
          <span class="md-error">Please select a section</span>
        </md-field>
        <md-field>
          <label>Application name</label>
          <md-input v-model="tileName"></md-input>
        </md-field>
        <md-field :class="{ 'md-invalid': showApplicationURLError }">
          <label>Application URL</label>
          <md-input v-model="tileURL"></md-input>
          <span class="md-error">Please enter application url</span>
        </md-field>
        <md-field
          ><label>Application icon URL (optional)</label>
          <md-input v-model="tileIconURL"></md-input>
        </md-field>
        <md-field
          ><label>Application icon file (optional)</label>
          <md-file
            accept="image/*"
            @change="appIconFileSelected"
            name="appIcon"
          ></md-file>
        </md-field>
      </md-tab>
      <md-tab md-label="Section" id="sectionTab">
        <md-field :class="{ 'md-invalid': showSectionNameError }">
          <label>Section name</label>
          <md-input v-model="sectionName"></md-input>
          <span class="md-error">Please enter section name</span>
        </md-field>
        <md-field>
          <label>Icon URL</label>
          <md-input v-model="sectionIconURL"></md-input>
        </md-field>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-primary" @click="closeButtonClicked()"
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
      sectionIconURL: "",
      tileSectionId: "",
      tileName: "",
      tileURL: "",
      tileIconURL: "",
      appIconFile: null,
      showSelectSectionError: false,
      showApplicationURLError: false,
      showSectionNameError: false,
    };
  },
  computed: {
    sections() {
      return this.$store.state.appLogic.sections;
    },
  },
  methods: {
    appIconFileSelected(event) {
      this.appIconFile = event.target.files[0];
    },
    tabChanged(tabId) {
      this.currentTabId = tabId;
    },
    closeButtonClicked() {
      this.showDialog = false;
      this.clearFields();
      this.appIconFile = null;
    },
    saveButtonClicked() {
      let result = false;
      if (this.currentTabId == "sectionTab") {
        result = this.saveNewSection();
      }
      if (this.currentTabId == "tileTab") {
        result = this.saveNewTile();
      }
      if (result) this.showDialog = false;
      if (!this.showDialog) this.clearFields();
    },
    saveNewSection() {
      if (this.sectionName.length == 0) {
        this.showSectionNameError = true;
        return false;
      }
      this.$store.dispatch("appLogic/addSection", {
        name: this.sectionName,
        iconURL: this.sectionIconURL,
      });
      return true;
    },
    saveNewTile() {
      let errors = false;
      if (this.tileSectionId.length == 0) {
        this.showSelectSectionError = true;
        errors = true;
      }
      if (this.tileURL.length == 0) {
        this.showApplicationURLError = true;
        errors = true;
      }
      if (errors) return false;
      this.tileURL =
        this.tileURL.startsWith("http://") ||
        this.tileURL.startsWith("https://")
          ? this.tileURL
          : "https://" + this.tileURL;

      this.$store.dispatch("appLogic/addTile", {
        name: this.tileName,
        url: this.tileURL,
        sectionId: this.tileSectionId,
        iconURL: this.tileIconURL,
        iconFile: this.appIconFile,
        score: 0,
      });
      return true;
    },
    clearFields() {
      this.sectionName = "";
      this.sectionIconURL = "";
      this.tileSectionId = "";
      this.tileName = "";
      this.tileURL = "";
      this.tileIconURL = "";
      this.appIconFile = null;
      this.showSelectSectionError = false;
      this.showApplicationURLError = false;
      this.showSectionNameError = false;
    },
  },
};
</script>

<style scoped>
.create-dialog .md-field {
  margin-bottom: 0.2rem;
}
</style>

import axios from "axios";

export default {
  async nuxtServerInit(vuexContext, context) {
    try {
      let sectionsResponse = await this.$apiLogic.getSections();
      let k2ScriptsResponse = await this.$apiLogic.getK2Scripts();
      vuexContext.commit("initializeAppData", {
        sections: sectionsResponse.data,
        k2Scripts: k2ScriptsResponse.data,
      });
    } catch (err) {
      console.log("Cannot load data from server");
      console.log(err); //TODO: redirect to error page with appropriate message
    }
  },
  setSearchFilter(vuexContext, searchFilter) {
    vuexContext.commit("setSearchFilter", searchFilter);
  },
  setSelectedSection(vuexContext, sectionId) {
    vuexContext.commit("setSelectedSection", sectionId);
  },
  setAccountNo(vuexContext, value) {
    vuexContext.commit("setAccountNo", value);
  },
  setSelectedRegion(vuexContext, code) {
    vuexContext.commit("setSelectedRegion", code);
  },
  async addTile(vuexContext, tile) {
    try {
      let tileId = await this.$apiLogic.addTile(tile);
      if (!tileId) {
        console.log("Couldn't add tile");
        return;
      }
      vuexContext.commit("addTile", { id: tileId, ...tile });
    } catch (err) {
      console.log(err);
    }
  },
  async addSection(vuexContext, section) {
    try {
      const sectionId = await this.$apiLogic.addSection(section);
      console.log(sectionId);
      if (!sectionId) {
        console.log("Couldn't add section, no/invalid response from server");
        return;
      }
      vuexContext.commit("addSection", {
        id: sectionId,
        tiles: [],
        ...section,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

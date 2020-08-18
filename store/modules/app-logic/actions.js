import axios from "axios";

export default {
  async nuxtServerInit(vuexContext, context) {},
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
      let response = await this.$apiLogic.addTile(tile);
      if (!response) {
        console.log("Couldn't add tile");
        return;
      }
      tile.iconURL = response.iconURL;
      tile.id = response.tileId;
      vuexContext.commit("addTile", tile);
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
  async registerUserWithEmail(vuexContext, user) {
    try {
      const response = await this.$apiLogic.registerUser(user);
      if (!response) {
        throw "Some error occured";
      }
      console.log("User registered and logged in");
      $nuxt.$router.replace({ path: "/" });
    } catch (err) {
      console.log(err);
      $nuxt.$router.replace({ path: "/register" });
    }
  },

  async loadIndexPage(vuexContext, user) {
    try {
      let sectionsResponse = await this.$apiLogic.getSections();
      let k2ScriptsResponse = await this.$apiLogic.getK2Scripts();
      vuexContext.commit("initializeAppData", {
        sections: sectionsResponse.data,
        k2Scripts: k2ScriptsResponse.data,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async loginUserWithEmail(vuexContext, user) {
    try {
      let loggedIn = await this.$apiLogic.loginUser(user);
      if (loggedIn) {
        return $nuxt.$router.replace({ path: "/" });
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

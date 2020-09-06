import axios from "axios";

export const state = () => {
  return {
    sections: [],
    selectedSection: {},
    searchFilter: "",
    homeSectionSelected: true,
    k2Scripts: [],
    selectedK2Script: {},
    accountNo: "",
    regions: [
      { name: "US East (N. Virginia)", code: "us-east-1" },
      { name: "US East (Ohio)", code: "us-east-2" },
      { name: "US West (N. California)", code: "us-west-1" },
      { name: "US West (Oregon)", code: "us-west-2" },
      { name: "Africa (Cape Town)", code: "af-south-1" },
      { name: "Asia Pacific (Hong Kong)", code: "ap-east-1" },
      { name: "Asia Pacific (Mumbai)", code: "ap-south-1" },
      { name: "Asia Pacific (Seoul)", code: "ap-northeast-2" },
      { name: "Asia Pacific (Singapore)", code: "ap-southeast-1" },
      { name: "Asia Pacific (Sydney)", code: "ap-southeast-2" },
      { name: "Asia Pacific (Tokyo)", code: "ap-northeast-1" },
      { name: "Canada (Central)", code: "ca-central-1" },
      { name: "Europe (Frankfurt)", code: "eu-central-1" },
      { name: "Europe (Ireland)", code: "eu-west-1" },
      { name: "Europe (London)", code: "eu-west-2" },
      { name: "Europe (Milan)", code: "eu-south-1" },
      { name: "Europe (Paris)", code: "eu-west-3" },
      { name: "Europe (Stockholm)", code: "eu-north-1" },
      { name: "Middle East (Bahrain)", code: "me-south-1" },
      { name: "South America (São Paulo)", code: "sa-east-1" },
    ],
    selectedRegion: {},
  };
};

export const getters = {
  tileCount: (state) => (sectionId) => {
    let section = state.sections.find((s) => s.id == sectionId);
    if (section) {
      return section.tiles.length;
    }
    let k2Script = state.k2Scripts.find((k) => k.id == sectionId);
    if (k2Script) {
      return k2Script.tiles.length;
    }
    return 0;
  },
  isK2ScriptSelected: (state) => {
    return state.selectedK2Script.id != undefined;
  },
};

export const mutations = {
  setSearchFilter(state, searchFilter) {
    state.searchFilter = searchFilter;
  },
  setSelectedSection(state, sectionId) {
    if (!sectionId) {
      state.selectedSection = {};
      state.selectedK2Script = {};
      return;
    }
    let section = state.sections.find((c) => c.id == sectionId);
    if (section) {
      state.selectedSection = section;
      state.selectedK2Script = {};
      return;
    }
    section = state.k2Scripts.find((k) => k.id == sectionId);
    if (section) {
      state.selectedSection = {};
      state.selectedK2Script = section;
      return;
    }
  },
  setAccountNo(state, value) {
    state.accountNo = value;
  },
  setSelectedRegion(state, code) {
    let region = state.regions.find((r) => r.code == code);
    if (region) state.selectedRegion = region;
  },
  toggleHomeSectionSelected(state, isSelected) {
    state.homeSectionSelected = isSelected;
  },
  addSection(state, section) {
    state.sections.push(section);
  },
  addTile(state, tile) {
    let section = state.sections.find((c) => {
      return c.id == tile.sectionId;
    });
    if (!section) {
      console.log("Section not found");
      return;
    }
    let newTile = {
      id: tile.id,
      name: tile.name,
      iconURL: tile.iconURL,
      url: tile.url,
    };
    section.tiles.push(newTile);
  },
  removeTile(state, data) {
    console.log("Remove tile called");
    const section = state.sections.find((s) => s.id == data.sectionId);
    if (!section) {
      console.log("No such section to remove tile from");
      return;
    }
    section.tiles = section.tiles.filter((t) => t.id != data.id);
  },

  initializeAppData(state, data) {
    state.sections = data.sections;
    state.k2Scripts = data.k2Scripts;
  },
};

export const actions = {
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
  setHomeSectionSelected(vuexContext, isSelected) {
    vuexContext.commit("toggleHomeSectionSelected", isSelected);
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
      tile.name = response.name;
      vuexContext.commit("addTile", tile);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteTile(vuexContext, tile) {
    try {
      //Fetching sectionid of tile
      const sections = vuexContext.state.sections;
      const section = sections.find((s) =>
        s.tiles.some((t) => t.id == tile.id)
      );
      if (!section) {
        throw "No such tile in any section";
      }
      let response = await this.$apiLogic.deleteTile({
        id: tile.id,
        sectionId: section.id,
      });
      // if (!response) {
      //   console.log("Couldn't delete tile");
      //   return;
      // }
      //Remove tile from store
      console.log("Tile deleted, removing from store");
      vuexContext.commit("removeTile", {
        id: tile.id,
        sectionId: section.id,
      });
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
      const login = await vuexContext.dispatch("login", user);
      $nuxt.$router.replace({ path: "/" });
    } catch (err) {
      console.log(err);
      $nuxt.$router.replace({ path: "/register" });
    }
  },
  async login(vuexContext, user) {
    try {
      await this.$auth.loginWith("local", {
        data: {
          username: user.username,
          password: user.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  async loadIndexPage(vuexContext) {
    try {
      // let sectionsResponse = await this.$apiLogic.getSections();
      // let k2ScriptsResponse = await this.$apiLogic.getK2Scripts();
      if (!this.$auth.loggedIn) {
        return false;
      }
      vuexContext.commit("initializeAppData", {
        sections: this.$auth.user.sections,
        k2Scripts: this.$auth.user.k2Scripts,
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

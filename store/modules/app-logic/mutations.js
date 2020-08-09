export default {
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
  // createSection(state, section) {
  //   let sectionAdded = await this.$apiLogic.addSection(section);
  //   if(!sectionAdded){
  //     return;
  //   }
  //   //This method is incomplete, will cause weird behaviour when invoked. Complete it
  //   state.sections.push(section);
  // },
  async createTile(state, tile) {
    let section = state.sections.find((c) => {
      return c.id == tile.sectionId;
    });
    if (!section) {
      console.log("Section not found");
      return;
    }
    let tileAdded = await this.$apiLogic.addTile(tile);
    if (!tileAdded) {
      console.log("Couldn't add tile");
      return;
    }
    let newTile = {
      id: "t_" + tile.name,
      name: tile.name,
      iconURL: tile.iconURL,
      url: tile.url,
    };
    section.tiles.push(newTile);
  },

  initializeAppData(state, data) {
    state.sections = data.sections;
    state.k2Scripts = data.k2Scripts;
    console.log(state.k2Scripts);
    //state.selectedSection = state.sections[0];
  },
};

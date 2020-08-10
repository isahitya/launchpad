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

  initializeAppData(state, data) {
    state.sections = data.sections;
    state.k2Scripts = data.k2Scripts;
  },
};

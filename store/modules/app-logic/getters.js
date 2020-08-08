export default {
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

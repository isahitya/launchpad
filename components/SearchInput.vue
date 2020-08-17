<template>
  <div>
    <div class="search-container" ref="searchContainer">
      <div class="search-icon"></div>
      <input
        type="text"
        class="search-input"
        placeholder="Search your apps"
        ref="searchInput"
        v-model="searchFilter"
        @focus="searchInputFocus"
        @blur="searchInputBlur"
      />
      <div
        class="close-icon"
        ref="searchCloseIcon"
        @click="closeButtonClick()"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResponsiveSearchInput: false,
    };
  },
  computed: {
    searchFilter: {
      get() {
        return this.$store.state.appLogic.searchFilter;
      },
      set(value) {
        this.$store.dispatch("setSearchFilter", value);
      },
    },
  },
  methods: {
    clearSearchInput() {
      this.$store.dispatch("setSearchFilter", "");
    },
    searchInputFocus() {
      this.$refs.searchCloseIcon.style.visibility = "visible";
      this.$refs.searchCloseIcon.style.transform = "rotate(90deg)";
    },
    searchInputBlur() {
      this.clearSearchInput();

      this.$refs.searchCloseIcon.style.visibility = "hidden";
      this.$refs.searchCloseIcon.style.transform = "rotate(0deg)";
    },
    closeButtonClick() {
      //TODO: prevent search input blur
      this.clearSearchInput();
    },
  },
};
</script>

<style>
.search-container {
  position: relative;
  margin-left: 1.78rem;
  margin-right: 3rem;
  width: 30rem;
  transition: all 0.2s linear;
}

.search-responsive-container {
  display: none;
  position: absolute;
}

.search-input {
  font-size: 1rem;
  border: none;
  width: 100%;
  height: 2.5rem;
  margin-right: 1rem;
  padding-left: 2.5rem;
  border-radius: 5px;
  background-color: #f2f3f4;
  outline: none;

  border-radius: 3px;
  transition: all 0.2s linear;
}

.search-icon {
  position: absolute;
  margin: 0px;
  margin-top: 0.4rem;
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  background-image: url("/search.png");
  opacity: 0.6;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 1.5rem 1.5rem;
}

.close-icon {
  top: 0rem;
  right: 2rem;
  visibility: hidden;
  position: absolute;
  margin: 0px;
  margin-top: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-image: url("/close.png");
  opacity: 0.6;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 1.75rem 1.75rem;
  transform-origin: center center !important;
  transition: all 0.2s linear;
}

.close-icon:hover {
  background-color: rgb(212, 212, 212);
}

.search-input:focus {
  background-color: #ffffff;
  box-shadow: 1px 1px 4px 1px rgb(0, 0, 0, 0.2);
}

@media (max-width: 30rem) {
  .hero {
    display: none;
  }
  .search-container {
    /* display: none; */
    margin-left: 1rem;
    width: calc(100vw - 5rem);
  }
  .close-icon {
    right: 1rem;
  }
}
</style>

<!--
Component will generate : 
  - Hero section 
  - Tabs 
-->

<template>
  <header class="app-header  ">
    <img
      class="hamburger-menu-icon"
      src="~/assets/icons/hamburger_menu_icon.png"
    />
    <div class="hero">
      <img src="~/assets/icons/large_launchio.png" />

      <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
    </div>
    <div class="search-container">
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
      <div class="close-icon" ref="searchCloseIcon"></div>
    </div>
    <i class="fa fa-refresh fa-2x" aria-hidden="true"></i>
    <img class="profile-image " src="~/assets/profile_image.jpeg" />
  </header>
</template>

<script>
export default {
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
    searchInputFocus() {
      this.$refs.searchCloseIcon.style.visibility = "visible";
      this.$refs.searchCloseIcon.style.transform = "rotate(90deg)";
    },
    searchInputBlur() {
      this.$refs.searchCloseIcon.style.visibility = "hidden";
      this.$refs.searchCloseIcon.style.transform = "rotate(0deg)";
    },
    closeButtonClick() {
      this.$store.dispatch("setSearchFilter", "");
    },
  },
};
</script>

<style>
.app-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0px;
  height: 3.7rem;
  box-shadow: none;
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid rgb(202, 202, 202);
}

.hamburger-menu-icon {
  height: 1.75rem !important;
  margin-left: 1rem;
  opacity: 0.85;
}

.search-container {
  position: relative;
  margin-left: 2rem;
}

.search-input {
  font-size: 1rem;
  border: none;
  width: 30rem;
  height: 2.5rem;
  padding-left: 2.5rem;
  border-radius: 5px;
  background-color: #f2f3f4;
  outline: none;

  border-radius: 3px;
  transition: all 0.1s linear;
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
  right: 1rem;
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

i.fa-refresh {
  opacity: 0.7;
  margin-left: auto;
  margin-right: 2rem;
}

.profile-image {
  width: 2.5rem;
  border-radius: 50%;
  margin-top: 0rem;

  margin-right: 2rem;
}

.hero {
  margin: 0px !important;
  margin-left: 1.5rem !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.hero h1 {
  font-weight: 400;
  color: rgb(56, 56, 56);
  font-style: italic;
  font-size: 1.15rem;
  margin-left: 0.5rem;
}

.hero img {
  height: 2.5rem !important;
}

.tabs {
  display: flex;

  justify-content: flex-start;
  align-items: center;
  margin-left: 6rem;
}

.tabs h1 {
  font-size: 1.1rem;
  font-weight: 400;
  color: rgb(32, 32, 32);
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

.vertical-separator {
  background-color: rgb(131, 131, 131);
  box-shadow: 0 0 2px rgb(58, 58, 58);
  opacity: 0.5;
  width: 1px;
  height: 3rem;
}
</style>

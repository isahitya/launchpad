<!--
Component will generate : 
  - Hamburger button
  - Hero section 
  - Search input field
  - Refresh icon
  - User avatar
-->

<template>
  <header class="app-header  ">
    <img
      class="hamburger-menu-icon"
      src="~/assets/icons/hamburger_menu_icon.png"
      @click="hamburgerButtonClick()"
    />
    <div class="hero">
      <img src="~/assets/icons/launchio_logo.png" />

      <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
    </div>
    <SearchInput />
    <i class="fa fa-refresh fa-2x" aria-hidden="true"></i>
    <img class="profile-image " src="~/assets/profile_image.jpeg" />
  </header>
</template>

<script>
export default {
  methods: {
    hamburgerButtonClick() {
      $nuxt.$emit("hamburger-button-click");
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
  border-bottom: 1px solid rgb(218, 218, 218);
}

.hamburger-menu-icon {
  cursor: pointer;
  height: 1.75rem !important;
  margin-left: 1rem;
  opacity: 0.85;
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
  margin-left: 1.4rem !important;
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
  /* height: 2.5rem !important; */
  width: 10rem;
  min-width: 10rem;
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

@media (max-width: 30rem) {
  .profile-image {
    visibility: hidden;
  }
  .fa-refresh {
    visibility: hidden;
  }
  .app-header {
    width: 100vw;
  }
}
</style>

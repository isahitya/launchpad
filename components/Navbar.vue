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
    <img
      class="user-avatar "
      id="user-avatar"
      src="~/assets/profile_image.jpeg"
      @click="togglePopoverMenu()"
    />
    <!-- <div class="logout-button" @click="$auth.logout()">
      <img src="https://img.icons8.com/ios/50/000000/export.png" />
      <h1>Logout</h1>
    </div> -->
    <PopoverMenu />
  </header>
</template>

<script>
export default {
  methods: {
    hamburgerButtonClick() {
      $nuxt.$emit("hamburger-button-click");
    },
    togglePopoverMenu() {
      $nuxt.$emit("toggle-popover-menu");
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
  box-shadow: 1px 1px 2px 1px rgb(0, 0, 0, 0.1);
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

.user-avatar {
  cursor: pointer;
  width: 2.5rem;
  border-radius: 50%;
  margin-top: 0rem;

  margin-right: 2rem;
}

.logout-button {
  cursor: pointer;
  margin-right: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 5.7rem;
  height: 2rem;
  /* background-color: rgb(250, 250, 250);
   */
  border-radius: 0.5rem;
  box-shadow: 0px 0px 2px 1px rgb(0, 0, 0, 0.1);
}

.logout-button h1 {
  font-size: 1.1rem;
  font-weight: 300;
}

.logout-button img {
  height: 1.4rem;
  width: 1.4rem;
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

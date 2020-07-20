<!---
 Generate the header of the app 
 Containing -
 Brand (Logo, Brand Name,)
 Account Number Field
 Quick Filter Field (to filter the tiles according to their tite, content)
 --->
<!--
 <App-head> component will generate   : 
   - Branding components :logo, title header, input box and filter box
   - This will be a navbar on the application page
 --->
<template>
  <header class="app-header">
    <div class="brand">
      <img class="logo" src="~/assets/icons/aws_logo_white.png" />
      <div class="separator"></div>
      <h1 class="title">Launchpad</h1>
    </div>
    <input class="account-no-input" placeholder="Account number" />
    <div class="quick-filter-hamburger-container">
      <a class="hamburger-menu-icon">
        <img src="~/assets/icons/hamburger_menu_icon.png"
      /></a>
      <img class="search-icon" src="~/assets/icons/search.png" />
      <input
        class="quick-filter"
        placeholder="Search"
        :value="$store.state.searchFilter"
        @input="setSearchFilter($event)"
      />
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    setSearchFilter(event) {
      this.$store.dispatch("setSearchFilter", event.target.value);
    },
  },
};
</script>

<style scoped>
.app-header {
  margin: 0px;
  box-shadow: 2px 1px 5px 1px rgb(0, 0, 0, 0.2);
  height: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #232f3e;
}

.brand {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo {
  margin-left: 1rem;
  height: 3.5rem;
}

.title {
  font-weight: 300;
  color: rgb(255, 255, 255);
  margin-left: 1rem;
  font-size: 1.5rem;
}

.separator {
  border-left: 1px solid #cfcfcf;
  height: 3rem;
  margin-left: 2px;
  margin-top: auto;
  margin-bottom: auto;
}

.account-no-input {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  height: 2rem;
  width: 15rem;
  padding-left: 0.5rem;
  margin-left: auto;
  margin-left: 1rem;
  outline: none;
}

.account-no-input:hover,
.account-no-input:focus {
  background-color: rgb(244, 249, 255);
  box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.05);
}

.account-no-input::placeholder {
  font-style: italic;
  opacity: 0.5;
}

.quick-filter-hamburger-container {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.hamburger-menu-icon {
  display: none;
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;
}
.hamburger-menu-icon img {
  width: 100%;
}

.quick-filter {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  height: 2rem;
  width: 15rem;
  padding-left: 2.5rem;
  margin-left: auto;
  margin-right: 5rem;
  outline: none;
}

.search-icon {
  position: absolute;
  height: 1.25rem;
  opacity: 0.5;
  margin-left: 0.75rem;
}

.quick-filter::placeholder,
.account-no-input::placeholder {
  color: rgb(139, 139, 139);
  opacity: 0.5;
  font-style: italic;
}

.quick-filter:hover,
.quick-filter:focus {
  background-color: rgb(244, 249, 255);
  box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.05);
}

@media (max-width: 30rem) {
  .app-header {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 10.5rem;
  }
  .title {
    font-size: 2rem;
    margin-top: 0.5rem;
  }
  .account-no-input {
    width: 18rem;
  }
  .quick-filter {
    width: 15rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  .hamburger-menu-icon {
    display: inline-block;
  }
}
</style>

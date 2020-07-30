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
      <img class="logo" :src="this.$store.state.iconURLs.awsLogoWhite" />
      <div class="separator"></div>
      <h1 class="title">Launchpad</h1>
    </div>
    <input
      class="account-no-input"
      placeholder="Account number"
      type="number"
      v-model="accountNumber"
      ref="accountNoInput"
    />
    <select
      class="region-select"
      @change="regionSelected($event)"
      ref="regionSelect"
      :style="{
        backgroundImage: `url(${this.$store.state.iconURLs.downArrow})`,
      }"
    >
      <option
        v-for="region in $store.state.regions"
        :key="region.code"
        :value="region.code"
        >{{ region.name }} {{ region.code }}</option
      >
    </select>
    <div class="quick-filter-hamburger-container">
      <a class="hamburger-menu-icon">
        <img :src="this.$store.state.iconURLs.hamburger"
      /></a>
      <img class="search-icon" :src="this.$store.state.iconURLs.search" />
      <input class="quick-filter" placeholder="Search" v-model="searchFilter" />
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    accountNumber: {
      get() {
        return this.$store.state.accountNumber;
      },
      set(value) {
        this.$store.dispatch("setAccountNumber", value);
      },
    },
    searchFilter: {
      get() {
        return this.$store.state.searchFilter;
      },
      set(value) {
        this.$store.dispatch("setSearchFilter", value);
      },
    },
  },
  methods: {
    regionSelected(event) {
      this.$store.dispatch("setSelectedRegion", event.target.value);
    },
  },
  mounted() {
    this.$refs.regionSelect.selectedIndex = 0;
    this.$refs.regionSelect.style.backgroundImage = "";
    this.$refs.accountNoInput.value = "";
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
  border-left: 1px solid #161e27;
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
  width: 20rem;
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

.region-select {
  background-repeat: no-repeat;
  background-position: right;
  background-size: 0.8rem;
  background-position-x: calc(100% - 0.3rem);
  padding-right: 1.5rem;
  padding-left: 0.5rem;
  border-radius: 3px;
  height: 2rem;
  margin-left: 1rem;
  background-color: white;
  color: rgb(42, 42, 42);
  outline: none;
}

.region-select option {
  height: 2rem;
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

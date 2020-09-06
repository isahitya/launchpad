<!--
Component will generate : 
  - An input field for account number
  - A select for for regions
-->
<template>
  <div class="account-no-and-region-container">
    <input
      type="text"
      class="account-no-input"
      placeholder="Enter account number"
      v-model="accountNo"
    />
    <select class="region-select" @change="regionSelected($event)">
      <option selected disabled hidden value="">Select a region</option>
      <option v-for="region in regions" :key="region.code" :value="region.code"
        >{{ region.name }} {{ region.code }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    regions() {
      return this.$store.state.appLogic.regions;
    },
    accountNo: {
      get() {
        return this.$store.state.appLogic.accountNo;
      },
      set(value) {
        this.$store.commit("appLogic/setAccountNo", value);
      },
    },
  },
  methods: {
    regionSelected(event) {
      this.$store.dispatch("appLogic/setSelectedRegion", event.target.value);
    },
  },
};
</script>

<style>
.account-no-and-region-container {
  align-self: flex-start;
  width: 80%;
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.account-no-input {
  font-size: 1rem;
  border: none;
  width: 20rem;
  height: 2.5rem;
  margin-right: 1rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgb(221, 221, 221);
  background-color: #f2f3f4;
  /* background-color: #f2f3f4; */
  outline: none;
  border-radius: 3px;
  transition: all 0.2s linear;
}

.account-no-input:focus {
  background-color: #ffffff;
  box-shadow: 1px 1px 4px 1px rgb(0, 0, 0, 0.2);
}

.region-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #ffffff;
  background-image: url("/down_arrow.png");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 0.5rem);
  background-position-y: 0.8rem;
  background-size: 1rem;
  outline: none;
  font-size: 0.9rem;
  border-radius: 0.2rem;
  border: 1px solid rgb(221, 221, 221);
  height: 2.5rem;
  padding-left: 0.5rem;
  padding-right: 1.5rem;
  transition: all 0.2s linear;
}

.region-select:hover {
  box-shadow: 1px 1px 4px 1px rgb(0, 0, 0, 0.2);
}
</style>

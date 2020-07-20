<template>
  <header class="app-header">
    <img class="logo" src="~/assets/icons/aws_logo.png" />
    <div class="separator"></div>
    <h1 class="title">Launchpad</h1>
    <input class="account-no-input" placeholder="Enter account number" />
    <input class="quick-filter" placeholder="Quick Filter" />
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.app-header {
  margin: 0px;
  box-shadow: 2px 1px 5px 1px rgb(0, 0, 0, 0.2);
  height: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(250, 250, 250);
}

.logo {
  margin-left: 1rem;
  height: 3rem;
}

.title {
  font-weight: 300;
  color: rgb(66, 66, 66);
  margin-left: 1rem;
  font-size: 1.5rem;
}

.separator {
  border-left: 1px solid rgb(170, 170, 170);
  height: 3rem;
  margin-left: 2px;
}

.account-no-input {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  height: 2.5rem;
  width: 15rem;
  padding-left: 0.5rem;
  margin-left: auto;
  margin-left: 1rem;
  outline: none;
}

.account-no-input:hover,
.account-no-input:focus {
  background-color: rgb(223, 239, 255);
  box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.05);
}

.quick-filter {
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  height: 2.5rem;
  width: 12rem;
  padding-left: 0.5rem;
  margin-left: auto;
  margin-right: 5rem;
  outline: none;
}

.quick-filter::placeholder,
.account-no-input::placeholder {
  color: rgb(139, 139, 139);
}

.quick-filter:hover,
.quick-filter:focus {
  background-color: rgb(223, 239, 255);
  box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.05);
}

@media (max-width: 30rem) {
  .app-header {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 10rem;
  }
}
</style>

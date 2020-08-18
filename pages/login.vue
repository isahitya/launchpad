<template>
  <div class="login-container">
    <div
      class="login-card md-elevation-3"
      :class="{ 'show-login-form': showLoginForm }"
    >
      <form class="login-form">
        <h1 class="md-display-1 login__headline">Log In</h1>
        <md-field>
          <label>Email Address</label>
          <md-input
            type="email"
            name="email"
            v-model="user.username"
          ></md-input>
        </md-field>
        <md-field>
          <label>Password </label>
          <md-input
            type="password"
            name="password"
            v-model="user.password"
          ></md-input>
        </md-field>
        <div class="login-form__buttons-container">
          <md-button @click="loginButtonClicked()" class="md-raised md-primary"
            >Login</md-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoginForm: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginButtonClicked() {
      this.$store.dispatch("loginUserWithEmail", this.user);
    },
  },
};
</script>

<style>
.login-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.login-card {
  justify-content: center;
  overflow: hidden;
  width: 35%;
  height: 19.5rem;
  min-width: 30rem;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  border-radius: 0.2rem;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.show-login-form {
  height: 31rem !important;
}

.login-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: none;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.show-login-form .login-options {
  height: 0rem;
  transform: translateX(-30rem);
}

.login-options__button {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
  background: rgb(245, 245, 245);
  border: 0rem;
  width: 80%;
  height: 2.5rem;
  border-radius: 0.1rem;
  /* box-shadow: 1px 2px 3px 1px rgb(0, 0, 0, 0.2); */
}

.login-options__button img {
  height: 1.5rem;
  margin-left: 2rem;
  margin-right: 1rem;
}

.login-options__button h1 {
  font-weight: 300;
  color: rgb(26, 26, 26);
  font-size: 1.1rem;
}

.login-options__separator {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  height: 1px;
  width: 100%;
  border-bottom: 1px solid rgb(165, 165, 165);
}

.login__headline {
  align-self: flex-start;
}

.login-form {
  margin-top: 0rem;
  position: relative;
  flex-direction: column;
  align-self: flex-end;
  height: 0rem;
  width: 100%;

  transition: ease-in-out, all 0.3s ease-in-out;
}

.login-form__buttons-container {
  display: flex;
  justify-content: space-between;
}

.login-form__back-button {
  position: absolute;
  top: 12rem;
  left: -4rem;
  height: 3rem !important;
  width: 3rem;
  cursor: pointer;
  background: whitesmoke;
  padding: 0.7rem;
  border-radius: 50%;
}

.show-login-form .login-form {
  display: flex;
  transform: none;
  height: auto;
  width: 100%;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.login-form__button {
  align-self: flex-end;
  width: 8rem !important;
  margin: 0rem;
  margin-top: 2rem;
}
</style>

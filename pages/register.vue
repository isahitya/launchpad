<template>
  <div class="register-container">
    <div
      class="register-card md-elevation-3"
      :class="{ 'show-register-form': showRegisterForm }"
    >
      <div class="register-options">
        <a
          class="register-options__button md-elevation-2"
          :href="googleAuthURL"
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
          <h1>Continue with Google</h1>
        </a>
        <div class="register-options__button md-elevation-2">
          <img src="https://img.icons8.com/ios-glyphs/60/000000/github.png" />
          <h1>Continue with Github</h1>
        </div>
        <div class="register-options__button md-elevation-2">
          <img src="https://img.icons8.com/color/96/000000/linkedin.png" />
          <h1>Continue with Linkedin</h1>
        </div>
        <div class="register-options__separator"></div>
        <div
          class="register-options__button md-elevation-2"
          @click="toggleRegisterForm()"
        >
          <img src="https://img.icons8.com/ios/100/000000/important-mail.png" />
          <h1>Sign Up with Email</h1>
        </div>
      </div>
      <form class="register-form">
        <!-- <img
          class="register-form__back-button md-elevation-1"
          src="https://img.icons8.com/ios-filled/64/000000/back.png"
          @click="toggleRegisterForm()"
        /> -->

        <h1 class="md-display-1 register__headline">Sign Up</h1>
        <md-field>
          <label>First Name</label>
          <md-input
            type="text"
            name="firstName"
            v-model="user.firstName"
          ></md-input>
        </md-field>
        <md-field>
          <label>Last Name</label>
          <md-input
            type="text"
            name="lastName"
            v-model="user.lastName"
          ></md-input>
        </md-field>
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
        <div class="register-form__buttons-container">
          <md-button @click="toggleRegisterForm()">Back</md-button>
          <md-button
            @click="registerButtonClicked()"
            class="md-raised md-primary"
            >Register</md-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    googleAuthURL() {
      //return this.$store.getters.apiURL + "/auth/google";
      return this.$nuxt.$apiLogic.apiURL + "/auth/google";
    },
  },
  data() {
    return {
      showRegisterForm: false,
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    toggleRegisterForm() {
      this.showRegisterForm = !this.showRegisterForm;
    },
    registerButtonClicked() {
      this.$store.dispatch("registerUserWithEmail", this.user);
    },
    // continueWithGoogleClicked() {
    //   this.$store.dispatch("continueWithGoogle");
    // },
  },
};
</script>

<style>
.register-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.register-card {
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

.show-register-form {
  height: 31rem !important;
}

.register-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: none;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.show-register-form .register-options {
  height: 0rem;
  transform: translateX(-30rem);
}

.register-options__button {
  text-decoration: none !important;
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

.register-options__button img {
  height: 1.5rem;
  margin-left: 2rem;
  margin-right: 1rem;
}

.register-options__button h1 {
  text-decoration: none !important;
  font-weight: 300;
  color: rgb(26, 26, 26);
  font-size: 1.1rem;
}

.register-options__separator {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  height: 1px;
  width: 100%;
  border-bottom: 1px solid rgb(165, 165, 165);
}

.register__headline {
  align-self: flex-start;
}

.register-form {
  margin-top: 0rem;
  position: relative;
  flex-direction: column;
  align-self: flex-end;
  height: 0rem;
  width: 100%;
  transform: translateX(30rem);
  transition: ease-in-out, all 0.3s ease-in-out;
}

.register-form__buttons-container {
  display: flex;
  justify-content: space-between;
}

.register-form__back-button {
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

.show-register-form .register-form {
  display: flex;
  transform: none;
  height: auto;
  width: 100%;
  transition: ease-in-out, all 0.3s ease-in-out;
}

.register-form__button {
  align-self: flex-end;
  width: 8rem !important;
  margin: 0rem;
  margin-top: 2rem;
}
</style>

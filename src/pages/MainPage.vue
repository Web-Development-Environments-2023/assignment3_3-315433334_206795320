<template>
  <div class="container">
    <h1 class="title"></h1>
    <div class="left-column">
      <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" ref="recipePreviewList"/>

      <!-- <i class="fa-regular fa-arrows-rotate fa-spin fa-xl" style="color: #000000;" @click="loadRandomRecipes"></i> -->
    </div>
    <div class="right-column">
      <template v-if="this.$root.store.username">

        <RecipePreviewList title="Last Watched Recipes" class="RandomRecipes center" ref="recipePreviewList"/>
        
      </template>
      <template v-else>
        <div class="login-form">
          <h2>Login</h2>
          <form @submit.prevent="onLogin">
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" v-model="$v.form.username.$model"
                :class="{ 'is-invalid': validateState('username') === false }" />
              <div class="invalid-feedback">
                Username is required
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="$v.form.password.$model"
                :class="{ 'is-invalid': validateState('password') === false }" />
              <div class="invalid-feedback">
                Password is required
              </div>
            </div>

            <button type="submit" class="login-button">Login</button>

            <div class="mt-2">
              Do not have an account yet?
              <router-link to="register">Register here</router-link>
            </div>
          </form>

          <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
            Login failed: {{ form.submitError }}
          </b-alert>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { required } from "vuelidate/lib/validators";
import axios from 'axios';

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      // recipesFetched: false,
      // lastViewedRecipes: [],
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async loadRandomRecipes() {
      await this.$refs.recipePreviewList.updateRecipes();
    },
    async login() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.server_domain + "/login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        );

        this.axios.defaults.withCredentials = false;

        this.$root.store.login(this.form.username);
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        // await this.fetchLastViewedRecipes();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;

        this.axios.defaults.withCredentials = false;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.login();
    },

  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.left-column,
.right-column {
  flex-basis: 48%;
}

.RandomRecipes {
  margin: 10px 0 10px;
}

.load-button {
  display: block;
  margin-top: 10px;
}

.login-button {
  display: block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-form {
  max-width: 400px;
}

.login-form h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.login-form form {
  margin-bottom: 24px;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-form .form-group {
  margin-bottom: 16px;
}

.login-form .invalid-feedback {
  color: #dc3545;
}

.login-form .mt-2 {
  margin-top: 8px;
}
</style>

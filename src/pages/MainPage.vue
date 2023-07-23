<template>
  <div class="container">
    <h1 class="title"></h1>
    <div class="left-column">
      <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" :recipes="randomRecipes" ref="recipePreviewList"/>

      <!-- <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" :recipes="randomRecipes"
        ref="recipePreviewList" :addToFavorite="addToFavorite" :isRecipeWatched="isRecipeWatched" /> -->

      <i class="fa fa-arrows-rotate icon" @click="loadRandomRecipes" style="font-size: 24px; cursor: pointer"></i>


      <!-- <i class="fa-regular fa-arrows-rotate fa-spin fa-xl" style="color: #000000;" @click="loadRandomRecipes"></i> -->
    </div>
    <div class="right-column">
      <template v-if="this.$root.store.username">
        <!-- <App :session="this.$root.store"/> -->

        <RecipePreviewList title="Last Watched Recipes" class="RandomRecipes center" :recipes="lastWatchedRecipes" ref="recipePreviewList"/>

        <!-- <RecipePreviewList title="Last Watched Recipes" class="RandomRecipes center" :recipes="lastWatchedRecipes"
          ref="recipePreviewList" :addToFavorite="addToFavorite" :isRecipeWatched="isRecipeWatched" /> -->

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
// import App from './App.vue'

export default {
  components: {
    RecipePreviewList
  },
  // props: ['addToFavorite', 'isRecipeWatched'],
  data() {
    return {
      // recipesFetched: false,
      // lastViewedRecipes: [],
      // recipes: [],
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
      lastWatchedRecipes: [],
      randomRecipes: [],
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
      try {
        const response = await axios.get(
          this.$root.store.server_domain + "/recipes/random"
        );

        this.randomRecipes = response.data; // Set the random recipes data
        // this.$refs.recipePreviewList.updateRecipes(this.randomRecipes);
      } catch (error) {
        console.log(error);
      }
    },

    async loadLastWatchedRecipes() {
      if (!this.$root.store.username) return; // Exit if user is not logged in

      // this.axios.defaults.withCredentials = true;


      try {
        console.log(this.$root.store.server_domain);

        const response = await axios.get(
          this.$root.store.server_domain + "/users/lastWatchedRecipes", 
          // "/api/users/lastWatchedRecipes", 
          {
            withCredentials: true
          }
        );
        // console.log(response);
        // this.axios.defaults.withCredentials = false;


        this.lastWatchedRecipes = response.data; // Set the last watched recipes data
        // this.$refs.recipePreviewList.updateRecipes(this.lastWatchedRecipes);
      } catch (error) {
        console.log(error);
        // this.axios.defaults.withCredentials = false;

      }
    },
    // async loadRandomRecipes() {
    //   await this.$refs.recipePreviewList.updateRecipes();

    async login() {
      try {
        // this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        );

        console.log(response);

        // req.session.user_id = user.user_id;

        // this.axios.defaults.withCredentials = false;

        this.$root.store.login(this.form.username);
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        // await this.fetchLastViewedRecipes();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;

        // this.axios.defaults.withCredentials = false;
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
    // async addToFavorite(id) {
    //   try {
    //     // event.stopPropagation();
    //     // console.log(id);
    //     console.log("im at addToFavorite")
    //     const response = await this.axios.post(
    //       this.$root.store.server_domain + "/users/favorites",
    //       {
    //         params: { recipe_Id: id },
    //       },{
    //         withCredentials: true 
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async isRecipeWatched(id) {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.server_domain + "/users/isWatched",
    //       {
    //         params: { recipe_Id: id },
    //       },{
    //         withCredentials: true 
    //       }
    //     );
    //     console.log(response);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // addToFavoriteFunction(id) {
    //   // Access the addToFavorite function from route params
    //   const addToFavorite = this.$route.params.addToFavorite;
    //   // Call the function
    //   return addToFavorite(id);
    // },
    // isRecipeWatchedFunction(id) {
    //   // Access the isRecipeWatched function from route params
    //   const isRecipeWatched = this.$route.params.isRecipeWatched;
    //   // Call the function
    //   return isRecipeWatched(id);
    //   // Your logic based on the watched value
    // },
  },

  created() {
    // Call the methods to load recipes automatically when the component is created
    this.loadRandomRecipes();
    this.loadLastWatchedRecipes();
    // this.isRecipeWatched();
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

@keyframes spinAnimation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-720deg); /* Spin the icon for two full turns (720 degrees) */
  }
}

.container .icon {
  transition: transform 0.2s; /* Add a smooth transition for the rotation */
}

.container:hover .icon {
  animation: spinAnimation 2s linear infinite;
}
</style>

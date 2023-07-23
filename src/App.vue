<template>
  <div id="app">
    <div class="navbar-wrapper" :class="{ 'scroll-down': isScrollDown }">
      <b-navbar class="bg-black">
        <b-container fluid>
          <b-row class="align-items-center justify-content-end" style="margin-left: 500px; margin-top: 15px;">
            <b-col cols="auto" class="text-center">
              <img src="@/images/logo.png" alt="Bon Apetit Logo" class="logo-img" :style="{ height: logoHeight }" />
            </b-col>
            <b-col cols="auto" style="margin-left: 240px;">
              <span class="navbar-text ms-3 text-white" v-if="!$root.store.username">Connected as Guest</span>
              <span class="navbar-text ms-3 text-white" v-else>Connected as {{ $root.store.username }}</span>
            </b-col>
            <b-col cols="auto" style="padding-right: 10px">
              <template v-if="!$root.store.username">
                <router-link :to="{ name: 'register' }" id="register_button"
                  class="btn btn-outline-light text-white">Register</router-link>
                <router-link :to="{ name: 'login' }" id="login_button"
                  class="btn btn-outline-light text-white">Login</router-link>
              </template>
              <template v-else>
                <b-dropdown variant="primary" class="custom-dropdown">
                  <template #button-content>
                    <span class="text-white">{{ $root.store.username }}</span>
                  </template>

                  <!-- <b-dropdown-item href="#">My Favorite Recipes</b-dropdown-item>
                  <b-dropdown-item href="#">My Recipes</b-dropdown-item>
                  <b-dropdown-item href="#">My Family Recipes</b-dropdown-item> -->

                  <router-link :to="{ name: 'myFavorites' }" tag="b-dropdown-item">My Favorite Recipes</router-link>
                  <router-link :to="{ name: 'myRecipes' }" tag="b-dropdown-item">My Recipes</router-link>
                  <router-link :to="{ name: 'familyRecipes' }" tag="b-dropdown-item">My Family Recipes</router-link>


                  <!-- <b-dropdown-item href="#"  @click="openModal">Create your own recipe</b-dropdown-item> -->
                </b-dropdown>
                <!-- <router-link :to="{ name: 'createARecipe' }" id="addRecipe_button"
                  class="btn btn-outline-light text-white">Create your own recipe</router-link> -->

                  <!-- <router-link :to="{ name: 'createARecipe' }" id="addRecipe_button"
                  class="btn btn-outline-light text-white" @click="showCreateRecipeModal = !showCreateRecipeModal"> -->

                  <router-link :to="{ name: 'createARecipe' }" id="addRecipe_button"
                  class="btn btn-outline-light text-white" @click="openCreateRecipeModal">
                  Create your own recipe
                </router-link>
              </template>
            </b-col>
            <b-col cols="auto" v-if="$root.store.username">
              <b-button variant="primary" @click="Logout">Logout</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-navbar>
      <hr class="navbar-divider custom-divider" />
      <b-navbar class="bg-black fixed-navbar">
        <b-container fluid>
          <b-row class="justify-content-between">
            <b-col cols="auto">
              <router-link :to="{ name: 'main' }" class="btn btn-outline-light text-white">Home</router-link>
            </b-col>
            <b-col cols="auto">
              <router-link :to="{ name: 'search' }" class="btn btn-outline-light text-white">Search</router-link>
            </b-col>
            <b-col cols="auto">
              <router-link :to="{ name: 'about' }" class="btn btn-outline-light text-white">About</router-link>
            </b-col>
          </b-row>
        </b-container>
      </b-navbar>
    </div>
    <router-view />
    <!-- <create-recipe-modal :session="session" /> -->
    <create-recipe-modal v-if="showCreateRecipeModal"/>

    <!-- <create-recipe-modal-ex v-if="showCreateRecipeModal"></create-recipe-modal-ex> -->
    <!-- <create-recipe-modal-ex v-if="showCreateRecipeModal" @close="hideCreateRecipeModal"></create-recipe-modal-ex> -->

  </div>
</template>

<script>
// import CreateRecipeModalEx from './components/CreateRecipeModalEx.vue';
import CreateRecipeModal from './components/CreateRecipeModal.vue';



export default {
  name: "App",
  components: {
    'create-recipe-modal': CreateRecipeModal
  },
  // props: {
  //   session: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      isScrollDown: false,
      logoHeight: "70px",
      showCreateRecipeModal: false
    }
  },

  // watch: {
  //   $route(to) {
  //     this.showCreateRecipeModal = to.matched.some(record => record.meta.showCreateRecipeModal);
  //   }
  // },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  // computed: {
  //   shouldShowCreateRecipeModal() {
  //     return this.$route.meta.showCreateRecipeModal;
  //   }
  // },
  // created() {
  //     this.$router.beforeEach((to, from, next) => {
  //       if (to.meta.showModal) {
  //         this.showCreateRecipeModal = true;
  //       } else {
  //         this.showCreateRecipeModal = false;
  //       }
  //       next();
  //     });
  //   },
  methods: {
    handleScroll() {
      this.isScrollDown = window.pageYOffset > 0;
      this.logoHeight = this.isScrollDown ? "50px" : "70px";
    },
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openCreateRecipeModal() {
      this.$refs.createRecipeModal.showModal = true;
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  min-height: 100vh;
  min-height: 100vh;
  background-image: url("images/white-flower-with-cooking-ingredients-table.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
}

.logo-img {
  transition: height 0.3s ease;
}

.b-navbar {
  height: 80px;
}

.custom-divider {
  border-top: 1px solid white;
  margin: 0;
  opacity: 0.5;
}

.fixed-navbar {
  position: fixed;
  width: 100%;
  z-index: 99;
}

.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
}

.scroll-down .navbar-wrapper {
  position: fixed;
}

.content-wrapper {
  padding-top: 80px;
  /* Adjust the value to match the height of the top navbar */
  padding-bottom: 40px;
  /* Adjust the value to match the height of the bottom navbar */
}

.bottom-navbar {
  height: 40px;
}

#register_button {
  margin-right: 20px;
}

.custom-dropdown .dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  /* Adjust the distance between button and dropdown items */
  left: 0;
}

/* Rest of your CSS styles */
</style>

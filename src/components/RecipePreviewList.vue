<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-if="recipes.length">
      <b-col v-for="r in recipes" :key="`${title}-${r.id}`">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h4>No recipes to show</h4>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    searchResults: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      let addToURL = "";
      switch (this.title) {
        case "Explore this recipes":
          addToURL = "/recipes/random";
          break;
        case "Last Watched Recipes":
          if (this.$root.store.username) {
            addToURL = "/users/lastWatchedRecipes";
          }
          break;
        case "Search Results":
          this.recipes = this.searchResults;
          return;

        default:
          return;
      }        
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + addToURL
        );
        this.recipes = response.data;        
        // if (this.title === "Explore") {
        //   console.log("hii");
        //   await this.randomRecipes();
        // } else if (this.title === "Last Viewed Recipes") {
        //   await this.lastViewedRecipes();
        // } else if (this.title === "My Favorite Recipes") {
        //   await this.favoriteRecipes();
        // } else if (this.title === "My Recipes") {
        //   await this.myRecipes();
        // } else if (this.title === "My Family Recipes") {
        //   await this.myFamilyRecipes();
        // } else if (this.title === "Search Results") {
        //   await this.searchRecipes();
        // } else if (this.title === "Last Search") {
        //   await this.LastSearch();
        // }
      } catch (error) {
        console.log(error);
      }
    },
    // async randomRecipes() {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.server_domain + "/recipes/random"
    //     );
    //     console.log(response);
    //     const recipes = response.data;
    //     console.log(response);
    //     this.recipes = [];
    //     this.recipes.push(...recipes);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

//    async lastViewedRecipes() {
//   try {
//     var response = null;
//     let returnedRecipes = [];

//     console.log(
//       this.$root.store.server_domain + "/users/lastWatchedRecipes"
//     );

    
//     response = await this.axios.get(
//       this.$root.store.server_domain + "/users/lastWatchedRecipes"
//       );
    

//     console.log(response);

//     if (response.data === []) {
//       console.log("no_results");
//     } else {
//       returnedRecipes = response.data;
//       this.recipes = [];
//       this.recipes.push(...returnedRecipes);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//  },

// async searchRecipes() {
//   console.log("in searchRecipes");
//   try {
//     // eslint-disable-next-line camelcase
//     const returnedRecipes = await this.axios.get(
//       this.$root.store.server_domain +
//         "/recipes/search/" +
//         this.query 
//         // "&number=" +
//         // this.number +
//         // "&cuisine=" +
//         // this.cuisine +
//         // "&diet=" +
//         // this.diet +
//         // "&intolerances=" +
//         // this.intolerances
//     );

//     console.log(returnedRecipes.data);

//     if (returnedRecipes.data === "There is no results!") {
//       this.no_results = true;
//     } else {
//       this.recipes = [];
//       this.recipes.push(...returnedRecipes.data);

//       if (this.sortby === "aggregateLikes") {
//         this.recipes = this.recipes.sort(
//           (a, b) => a.aggregateLikes - b.aggregateLikes
//         );
//       } else if (this.sortby === "readyInMinutes") {
//         this.recipes = this.recipes.sort(
//           (a, b) => a.readyInMinutes - b.readyInMinutes
//         );
//       }
//     }
//     this.$root.store.setLastSearch(this.recipes);
//   } catch (error) {
//     console.log(error);
//   }
// }



  },
};
</script>

<style scoped>
.recipe-preview-list {
  margin-top: 20px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
}

.title {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.recipe-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recipe-col {
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}

.recipe-col:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h4 {
  margin-top: 0;
  color: #666666;
  text-align: center;
}
</style>
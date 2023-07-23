<template>
  <div class="container">
    <RecipePreviewList title="My Favorites Recipes" :recipes="favoritesRecipes" :addToFavorite="addToFavorite"
      :isRecipeWatched="isRecipeWatched" :isPreview="true" :show_ing_and_serv="false" />
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default
  {
    name: "myFavorites",
    components:
    {
      RecipePreviewList: RecipePreviewList
    },
    props: {
      // isRecipeWatched: {
      //   type: Function
      // }
    },
    data() {
      return {
        favoritesRecipes: []
      };
    },
    methods:
    {
      async getFavoritesRecipes() {
        try {
          // this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/getFavorites",
            {
              withCredentials: true
            }
            // "https://foodisgood.cs.bgu.ac.il/users/getFavorites"
          );
          // this.axios.defaults.withCredentials = false;

          console.log(response);
          this.favoritesRecipes = [];
          this.favoritesRecipes.push(...response.data);
        }
        catch (err) {
          console.log(err.response);
        }
      },
    },
    created() {
      this.getFavoritesRecipes();
      // this.$root.$emit('isRecipeWatched', /* pass any necessary data */);
    }
  };
</script>

<style lang="scss" scoped>
.container {
  max-width: 520px;
}
</style>
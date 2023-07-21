<template>
  <div class="container">
    <RecipePreviewList 
    title="Favorites Page"
    :recipes="favoritesRecipes"
    :isPreview="true"
    :show_ing_and_serv="false"
    />
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
    data() {
      return {
        favoritesRecipes: []
      };
    },
    methods:
    {
      async getFavoritesRecipes() {
        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            "http://localhost:3000/users/favorites"
            // "https://foodisgood.cs.bgu.ac.il/users/getFavorites"
          );
          this.axios.defaults.withCredentials = false;

          console.log(response);
          this.favoritesRecipes = [];
          this.favoritesRecipes.push(...response.data);
        }
        catch (err) {
          console.log(err.response);
        }
      }
    },
    mounted() {
      this.getFavoritesRecipes();
    }
  };
</script>

<style lang="scss" scoped>
.container{
  max-width: 520px;
}
</style>
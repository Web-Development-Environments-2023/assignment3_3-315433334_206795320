<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.ingredient_name"
              
              >
                  {{ r.ingredient_name }} : {{ r.amount }} {{r.units}}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/users/" + `${this.$route.params.recipeId}`,
          { withCredentials:true }
        );
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      const {
        title,
        image,
        readyInMinutes,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        instructions,
        extendedIngredients,
      } = response.data;
      const _recipe = {
        title,
        image,
        readyInMinutes,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        instructions,
        extendedIngredients,
      };

      this.recipe = _recipe;
      console.log(this.recipe)
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
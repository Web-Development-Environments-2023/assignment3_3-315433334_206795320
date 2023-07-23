<template>
    <b-container>
      <br>
      <b-row v-for="(group, groupIndex) in getRecipeGroups()" :key="groupIndex">
        <b-col v-for="recipe in group" :key="recipe.id">
          <!-- <RecipePreview class="recipePreview" :recipe="recipe" /> -->
        </b-col>
      </b-row>
      <br>
    </b-container>
  </template>
  
  <script>
  import RecipePreview from "./RecipePreview";
  export default {
    name: "searchResultList",
    components: {
      // RecipePreview
    },
    props: {
      recipes: {
        type: Array,
        required: true
      }
    },
    methods: {
      getRecipeGroups() {
        const groups = [];
        for (let i = 0; i < this.recipes.length; i += 5) {
          groups.push(this.recipes.slice(i, i + 5));
        }
        return groups;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    min-height: 400px;
  }
  </style>
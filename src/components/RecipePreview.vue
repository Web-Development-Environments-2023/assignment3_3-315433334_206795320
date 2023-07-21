<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="card recipe-card">
      <div class="image-container">
        <img v-if="image_load" :src="recipe.image" class="card-img-top recipe-image" />
      </div>
      <div class="card-body recipe-details">
        <h5 class="card-title recipe-title">{{ recipe.title }}</h5>
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <img src="@/images/time-icon.png" class="time-icon"/> {{ recipe.readyInMinutes }} minutes
          </div>
          <div class="list-group-item">
            <img src="@/images/like.png" class="like"/> {{ recipe.aggregateLikes }} likes
          </div>
          <div class="list-group-item">
            <!-- <md-icon name="leaf" title="Vegetarian" v-if="recipe.vegetarian"/> -->
            <!-- <i class="fas fa-seedling fa-beat fa-lg" title="Vegan" v-if="recipe.vegan"></i>
            <i class="fas fa-leaf fa-beat fa-lg" title="Vegetarian" v-if="recipe.vegetarian"></i>
            <i class="fas fa-wheat-awn-circle-exclamation fa-beat fa-lg" title="Gluten Free" style="color: #000000;"></i>  -->
          </div>
          <div class="list-group-item">
            <button
              class="favorite-button btn btn-sm"
              :class="{ favorite: recipe.favorite }"
              @click="toggleFavorite(recipe)"
            >
              <i class="fas fa-star"></i>
            </button>
            <i class="fas fa-eye" v-if="recipe.isWatched"></i>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleFavorite(recipe) {
      // Add your favorite toggling logic here
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  /* Remove custom styles for background color and border */
}

.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 16px;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-details {
  text-align: center;
}

.recipe-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  transition: color 0.2s;
}

.details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 14px;
}

.favorite-button {
  /* Add Bootstrap button classes */
}

.favorite {
  color: gold;
}

.fa-eye {
  margin-left: 8px;
  color: green;
}

.fa-star {
  font-size: 16px;
}

.fa-seedling,
.fa-leaf,
.fa-bread-slice {
  font-size: 20px;
  margin-right: 4px;
}


.time-icon {
  width: 23px;
  height: 23px;
  margin-right: 4px;
}

.like {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

.my-custom-class {
  color: red;

}
</style>

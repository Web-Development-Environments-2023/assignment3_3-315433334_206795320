
<template>
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
    <div class="card recipe-card">
      <div class="image-container">
        <img v-if="image_load" :src="recipe.image" class="card-img-top recipe-image" />
      </div>
      <div class="card-body recipe-details">
        <h5 class="card-title recipe-title">{{ recipe.title }}</h5>
        <div class="list-group list-group-flush">
          <div class="list-group-item">
            <img src="@/images/time-icon.png" class="time-icon" /> {{ recipe.readyInMinutes }} minutes
          </div>
          <div class="list-group-item">
            <img src="@/images/like.png" class="like" /> {{ recipe.aggregateLikes }} likes
          </div>
          <div class="list-group-item">
            <div class="list-group-item">
              <!-- Vegan icon -->
              <span v-if="recipe.vegan" title="Vegan">
                🌱
              </span>

              <!-- Vegetarian icon -->
              <span v-if="recipe.vegetarian" title="Vegetarian">
                🍃
              </span>

              <!-- Gluten Free icon -->
              <span title="Gluten Free" style="font-size: 24px; color: #000000;">
                🌾
              </span>
            </div>
          </div>
          <div class="list-group-item">
            <!-- Watched icon -->
            <span>
              <!-- Watched icon -->
              <!-- <span v-if="!isRecipeWatched(recipe.id)" style="font-size: 20px;"> -->
                <!-- Closed eye -->
                <!-- &#128065; -->
                 
              <!-- </span> -->
              <!-- <span v-else style="font-size: 20px;"> -->
              <span style="font-size: 20px;">
                <!-- Open eye -->
                &#128064; 
              </span>
            </span>
            <!-- Favorite button -->
            <!-- <button id class="favorite-button btn btn-sm" :class="{ favorite: recipe.favorite }" v-if="!recipe.favorite" @click="addToFavorite(recipe.id)"> -->
            <button id class="favorite-button btn btn-sm" :class="{ favorite: recipe.favorite }" v-if="!recipe.favorite">
              ⭐
            </button>
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
    // addToFavorite: {
    //   type: Function,
    //   required: false,
    // },
    // isRecipeWatched: {
    //   type: Function,
    //   required: false,
    // }
  },
  methods: {
    // async addToFavorite(id) {
    //   try {
    //     console.log(id);
    //     const response = await this.axios.post(
    //       this.$root.store.server_domain + "/users/favorites",
    //       { recipeId: id }, { withCredentials: true }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async isRecipeWatched(id) {
    //   try {
    //     const response = await this.axios.get(
    //       this.$root.store.server_domain + "/users/isWatched",
    //       { recipe_Id: id }, { withCredentials: true }
    //     );
    //     console.log(response);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
};
</script>

<style>
.card.recipe-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  text-decoration: none;
}

.recipe-title {
  font-size: 18px;
  margin-bottom: 8px;
  transition: color 0.2s;
}

.details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.favorite-button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px;
  font-size: 24px;
  transition: transform 0.2s;
}

.favorite-button:hover {
  transform: scale(1.3);
  cursor: pointer;
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
</style>
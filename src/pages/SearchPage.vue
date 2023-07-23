<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for recipes..."
        @keyup.enter="searchRecipes"
      />
      <button @click="searchRecipes">Search</button>
    </div>
    <div class="form-group">
      <label for="number">number:</label>
        <select class="option2" id="number" v-model="number">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
    </div>
    <div class="list-group-item">
      <div class="form-group">
        <label for="diet">Filter By diet:</label>
        <select id="diet" v-model="selectedDiet">
        <option value="">No Filter</option>
        <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cuisine">Filter By cuisine:</label>
        <select id="cuisine" v-model="selectedCuisine">
        <option value="">No Filter</option>
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="intolerance">Filter By intolerance:</label>
        <select id="intolerance" v-model="selectedIntolerance">
        <option value="">No Filter</option>
        <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}</option>
        </select>
      </div>
    </div>
    <div> 
        <b-button type="reset" @click="reset">Reset</b-button>
      </div>
      <div>
        <b-dropdown id="dropdown-1" text="Sort" class="m-md-2" variant="warning" >
          <b-dropdown-item @click="sortPopularity">Popularity</b-dropdown-item>
          <b-dropdown-item @click="sortPreparationTime">Time</b-dropdown-item>
        </b-dropdown>
      </div>
  <div id="res"> 
    <searchResultList :recipes="this.$root.store.array_search"></searchResultList>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import diets from "@/assets/diets.js";
import cuisines from "@/assets/cuisines.js";
import intolerances from "@/assets/intolerances.js";
import searchResultList from "../components/searchResultList";

export default {
  name: "SearchPage",
  components: {
    searchResultList
  },
  data() {
    return {
      selectedCuisine: "",
      selectedDiet: "",
      selectedIntolerance: "",
      diets: diets,
      cuisines: cuisines,
      intolerances: intolerances,
      searchQuery: "",
      number: 5,
      response: []
    };
  },
  methods: {
    async searchRecipes() {
      try {
        console.log(this.$root.store.server_domain + "/recipes/search/" + this.searchQuery +
              this.number +
              this.selectedCuisine +
              this.selectedDiet +
              this.selectedIntolerance
          );
        this.response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search/" + this.searchQuery,
          {
            params: {
              query: this.$route.params.query,
              number: this.number,
              cuisine: this.selectedCuisine,
              diet: this.selectedDiet,
              intolerance: this.selectedIntolerance
          }
        }
      );
      // if (response.status != 200) {
      //   this.$router.replace("/NotFound");
      // }
      if (this.response.data.length == 0) {
          alert("No recipes found.");
          return;
        }
      console.log(this.response);
      this.response = this.response.data;
      this.$root.store.array_search = this.response;
      } catch (error) {
        this.reset();
        console.log(error);
        this.$router.replace("/NotFound");
      }
      this.reset();
    },
    toggleDropdown(index) {
      this.filters[index].isOpen = !this.filters[index].isOpen;
    },
    sortPopularity() {
  this.response = this.$root.store.array_search.slice().sort((a, b) => {
    return parseInt(a.popularity) - parseInt(b.popularity);
  });
},

sortPreparationTime() {
  this.response = this.$root.store.array_search.slice().sort((a, b) => {
    return parseInt(a.readyInMinutes) - parseInt(b.readyInMinutes);
  });
},

    reset() {
      this.searchQuery = "",
      this.number = 5,
      this.selectedCuisine = "",
      this.selectedDiet = "",
      this.selectedIntolerance = ""
    }
  },

};
/* eslint-disable */
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.list-group-item {
  display: flex;
  width: 500px;
}

.list-group-item .dropdown {
  margin-right: 20px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  width: 400px;
  height: 40px;
  font-size: 18px;
  padding: 5px;
}

.search-bar button {
  height: 40px;
  font-size: 18px;
  margin-left: 10px;
}

.filter-options {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 0 10px;
}

.filter-button {
  display: flex;
  align-items: center;
}

.emoji {
  font-size: 24px;
  margin-right: 5px;
}

.filter-label {
  font-weight: bold;
}

.dropdown {
  position: relative;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-options div {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.recipe-preview {
  margin-bottom: 20px;
}

/* .option2 {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
} */

.recipe-preview img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}

.no-results {
  margin-top: 20px;
  font-style: italic;
}
</style>
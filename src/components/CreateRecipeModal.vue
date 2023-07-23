<template>
  <div class="create-recipe-modal">
    <!-- Using value -->
    <button class="btn btn-primary buttonCreate" @click="showModal = true">Create A Recipe</button>

    <!-- The modal -->
    <b-modal v-model="showModal" id="my-modal" @ok="onRegister" @show="onReset" @hidden="onReset"
      title="Create your own recipe!"
    >
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!-- Title -->
        <b-form-group label="Title:" label-for="name" class="mb-3">
          <b-form-input
            id="name"
            v-model="$v.form.name.$model"
            placeholder="Ex: Pancake"
            type="text"
            :state="validateState('name')"
          />
          <b-form-invalid-feedback v-if="!$v.form.name.required">
            Recipe's name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Image URL -->
        <b-form-group label="Image URL:" label-for="imageURL" class="mb-3">
          <b-form-input
            id="imageURL"
            v-model="$v.form.imageURL.$model"
            placeholder="Ex: https://pancake.jpg"
            type="text"
            :state="validateState('imageURL')"
          />
          <b-form-invalid-feedback v-if="!$v.form.imageURL.required">
            Recipe's imageURL is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Duration -->
        <b-form-group label="Duration:" label-for="preparationTimeInMinutes" class="mb-3">
          <b-form-input
            id="preparationTimeInMinutes"
            v-model="$v.form.preparationTimeInMinutes.$model"
            placeholder="Ex: 45 (In minutes)"
            type="text"
            :state="validateState('preparationTimeInMinutes')"
          />
          <b-form-invalid-feedback v-if="!$v.form.preparationTimeInMinutes.required">
            Recipe's duration is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.preparationTimeInMinutes.numeric">
            Insert time with numbers (in min)
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Ingredients -->
        <b-form-group label="Ingredients:" label-for="ingredients" class="mb-3">
          <b-form-input
            id="ingredients"
            v-model="$v.form.ingredients.$model"
            placeholder="Ex: sugar, eggs.."
            type="text"
            :state="validateState('ingredients')"
          />
          <b-form-invalid-feedback v-if="!$v.form.ingredients.required">
            Recipe's ingredients are required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Instructions -->
        <b-form-group label="Instructions:" label-for="instructions" class="mb-3">
          <b-form-input
            id="instructions"
            v-model="$v.form.instructions.$model"
            placeholder="Ex: Mix the content together"
            type="text"
            :state="validateState('instructions')"
          />
          <b-form-invalid-feedback v-if="!$v.form.instructions.required">
            Recipe's instructions are required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Serving -->
        <b-form-group label="Servings:" label-for="servings" class="mb-3">
          <b-form-input
            id="servings"
            v-model="$v.form.servings.$model"
            placeholder="Ex: 4"
            type="text"
            :state="validateState('servings')"
          />
          <b-form-invalid-feedback v-if="!$v.form.servings.required">
            Recipe's servings is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.servings.numeric">
            Servings amount should be in numbers
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="checkbox-group mb-3">
          <b-form-checkbox id="vegan" v-model="vegan" name="vegan" value="true" unchecked-value="false">
            Vegan
          </b-form-checkbox>
          <b-form-checkbox id="vegetarian" v-model="vegetarian" name="vegetarian" value="true" unchecked-value="false">
            Vegetarian
          </b-form-checkbox>
          <b-form-checkbox id="glutenFree" v-model="glutenFree" name="glutenFree" value="true" unchecked-value="false">
            GlutenFree
          </b-form-checkbox>
        </div>

        <div class="text-center">
          <b-button variant="primary" type="submit">Create Recipe</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, VBModal, BFormCheckbox } from "bootstrap-vue";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "modal",
  data() {
    return {
      form: {
        name: "",
        imageURL: "",
        preparationTimeInMinutes: "",
        ingredients: "",
        instructions: "",
        servings: "",
      },
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      showModal: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      imageURL: {
        required,
      },
      preparationTimeInMinutes: {
        required,
        numeric,
      },
      ingredients: {
        required,
      },
      instructions: {
        required,
      },
      servings: {
        required,
        numeric,
      },
    },
  },
  components: {
    BModal,
    BFormCheckbox
  },
  directives: {
    "b-modal": VBModal,
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async CreateRecipe() {
      try {
        console.log("vegan" + this.vegan);
        console.log("vegetarian" + this.vegetarian);
        console.log("glutenFree" + this.glutenFree);
        
        const response = await this.axios.post(this.$root.store.server_domain + "/users/createARecipe", {
          name: this.form.name,
          imageURL: this.form.imageURL,
          preparationTimeInMinutes: this.form.preparationTimeInMinutes,
          numOfLikes: 0,
          vegan: this.vegan ? 1 : 0,
          vegetarian: this.vegetarian ? 1 : 0,
          glutenFree: this.glutenFree ? 1 : 0,
          instructions: this.form.instructions,
          servings: this.form.servings,
          ingredients: this.form.ingredients,
        }, { withCredentials: true });

        console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister(bvModalEvent) {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.CreateRecipe();
    },
    onReset() {
      this.form = {
        name: "",
        imageURL: "",
        preparationTimeInMinutes: "",
        ingredients: "",
        instructions: "",
        servings: "",
      };
      this.vegan = false;
      this.vegetarian = false;
      this.glutenFree = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>

<style>
.create-recipe-modal .modal-content {
  border-radius: 8px;
}

.create-recipe-modal .modal-header {
  background-color: #f0ad4e;
  color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.create-recipe-modal .modal-title {
  font-size: 20px;
  font-weight: bold;
}

.create-recipe-modal .modal-body {
  padding: 1rem 2rem;
}

.create-recipe-modal .modal-footer {
  justify-content: center;
  border-top: none;
  padding: 1rem;
}

.create-recipe-modal .checkbox-group {
  display: flex;
  justify-content: center;
}

.create-recipe-modal .b-form-checkbox {
  margin-right: 1rem;
}

.create-recipe-modal .b-button {
  margin-top: 1rem;
}

.create-recipe-modal .b-button-primary {
  background-color: #007bff;
}
</style>

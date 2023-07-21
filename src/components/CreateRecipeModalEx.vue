<template>
    <div class="modal-container">
        <!-- need to complete validation and fix instruction and ingredients to be multiple input that controledby user -->
        <!-- <b-modal id="recipeCreation" name="Create new recipe" @show="resetModal" @hidden="resetModal" hide-footer> -->
        <!-- <b-modal id="recipeCreation" name="recipeCreation" name="Create new recipe" @show="resetModal" @hidden="resetModal" hide-footer> -->
        <b-card bg-variant="light">
            <b-form-group label="Enter recipe name" label-for="recipeTitle" class="ml-5" label-cols="3">
                <b-form-input id="recipeTitle" v-model="recipe.name" :state="recipeTitleState" placeholder="Title"
                    style="max-width: 1450px"></b-form-input>
                <b-form-invalid-feedback v-if="!isValidTitle">
                    Enter at least 1 character
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Add image URL" label-for="recipeImage">
                <b-form-input id="recipeImage" v-model="recipe.imageURL" :state="recipeImageState" placeholder="Image's url"
                    style="max-width: 1450px"></b-form-input>
                <b-form-invalid-feedback v-if="!isValidImage">
                    Enter image url
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Enter recipe's time preperation" label-for="recipeTimePreperation"
                placeholder="Time preperation">
                <b-form-input id="recipeTimePreperation" v-model="recipe.preparationTimeInMinutes" :state="recipeTimeState"
                    style="max-width: 1450px"></b-form-input>
                <b-form-invalid-feedback v-if="!isValidTime">
                    Enter at least 1 number
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Enter recipe's serving amount" label-for="recipeServing" placeholder="Serving">
                <b-form-input id="recipeServing" v-model="recipe.servings" :state="recipeServingState"
                    style="max-width: 1450px"></b-form-input>
                <b-form-invalid-feedback v-if="!isValidServing">
                    Enter at least 1 digit
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <div v-for="(instructionStep, i) in recipe.instructions" :key="i">
                    Add instruction:
                    <b-form-input v-model="instructionStep.instruction" placeholder="Instruction"
                        :state="recipeInstructionsState" style="max-width: 1450px"></b-form-input>
                    <b-form-invalid-feedback v-if="!isValidInstructions">
                        Enter at least 1 character
                    </b-form-invalid-feedback>
                    <br>
                </div>
                <b-button type="button" @click="addNewInstruction">Add instruction</b-button>
            </b-form-group>

            <b-form-group>
                <div v-for="(ingredientStep, i) in recipe.ingredients" :key="i">
                    Add ingredient's details:
                    <b-form-input v-model="ingredientStep.name" placeholder="ingredient's name"
                        :state="recipeIngredientsState" style="max-width: 1450px"></b-form-input>
                    <b-form-invalid-feedback v-if="!isValidIngredients">
                        Enter at least 1 character
                    </b-form-invalid-feedback>
                    <br>
                    <b-form-input v-model="ingredientStep.amount" placeholder="amount" :state="recipeIngredientsState"
                        style="max-width: 1450px"></b-form-input>
                    <b-form-invalid-feedback v-if="!isValidIngredients">
                        Enter at least 1 character
                    </b-form-invalid-feedback>
                    <br>
                </div>
                <b-button type="button" @click="addNewIngredient">Add Ingredient</b-button>
            </b-form-group>
            <!-- <b-form-checkbox-group v-model="selected" :options="options" value-field="item" text-field="name">
            </b-form-checkbox-group> -->

            <b-form-checkbox-group v-model="selectedDiets" :options="dietOptions"></b-form-checkbox-group>

            <br>
            <b-form-group>
                <b-button id="btnSubmit" variant="primary" @click="handleSubmit">Submit</b-button>
                <b-button id="btnCancel" variant="danger" @click="$bvModal.hide('recipeCreation')">Cancel</b-button>
            </b-form-group>
            <!-- </b-modal> -->
        </b-card>
    </div>
</template>

<script>
// import CreateRecipeModalEx from './components/CreateRecipeModalEx.vue';
import { BFormCheckboxGroup, BModal } from "bootstrap-vue";
// import Vue from 'vue'
// import App from './App.vue'
// import {BModal} from "bootstrap-vue"
// import BModal from "bootstrap-vue"
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Vue.use(BModal)
// Vue.use(BFormCheckboxGroup)


export default {
    name: 'recipeCreation',
    components: {
        // BModal,
        BFormCheckboxGroup
    },
    data() {
        return {
            recipe: {
                name: '',
                imageURL: '',
                preparationTimeInMinutes: '',
                ingredients: [{
                    name: '',
                    amount: '',
                }],
                instructions: [{
                    instruction: '',
                }],
                servings: '',
                vegan: false,
                vegetarian: false,
                glutenFree: false,
                numOfLikes: 0,
            },
            selectedDiets: [],
            dietOptions: [
                { text: 'Vegan', value: 'vegan' },
                { text: 'Vegetarian', value: 'vegetarian' },
                { text: 'Gluten-Free', value: 'glutenFree' }
            ]
        }
    },
    computed: {
        isValidTitle() {
            return this.recipe.name.length > 0;
        },

        isValidImage() {
            return this.recipe.imageURL.length > 0;
        },

        isValidTime() {
            return !isNaN(parseInt(this.recipe.preparationTimeInMinutes, 10));
        },

        isValidServing() {
            return this.recipe.servings.length > 0;
        },

        isValidInstructions() {
            return this.recipe.instructions.every(ins => ins.instruction.length > 0);
        },

        isValidIngredients() {
            return this.recipe.ingredients.every(ing => ing.name.length > 0 && ing.amount.length > 0);
        },

        recipeTitleState() {
            return this.isValidTitle;
        },

        recipeImageState() {
            return this.isValidImage;
        },

        recipeTimeState() {
            return this.isValidTime;
        },

        recipeServingState() {
            return this.isValidServing;
        },

        recipeInstructionsState() {
            return this.isValidInstructions;
        },

        recipeIngredientsState() {
            return this.isValidIngredients;
        }
    },
    methods: {
        Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");

            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
        },
        resetModal() {
            this.recipe.name = '';
            this.selected = [];
            this.recipe.imageURL = '';
            this.recipe.preparationTimeInMinutes = '';
            this.recipe.ingredients = [{
                name: '',
                amount: '',
            }];
            this.recipe.instructions = [{
                instruction: '',
            }];
            this.recipe.servings = '';
            this.recipe.vegan = false;
            this.recipe.vegetarian = false;
            this.recipe.glutenFree = false;
        },
        // 1. need to delete the session check in the end because we already shold have cookies.
        // 2. need to validate that we dont send empty field to server.
        async handleSubmit() {
            if (this.recipe.name && this.recipe.imageURL && this.recipe.preparationTimeInMinutes && this.recipe.ingredients[0].name &&
                this.recipe.ingredients[0].amount && this.recipe.instructions[0].instruction && this.recipe.servings) {
                const session = this.$cookies.get("session");
                if (this.selectedDiets.includes('Vegan')) {
                    this.recipe.vegan = true;
                }
                if (this.selectedDiets.includes('Vegetarian')) {
                    this.recipe.vegetarian = true;
                }
                if (this.selectedDiets.includes('Gluten')) {
                    this.recipe.glutenFree = true;
                }
                this.recipe.preparationTimeInMinutes = parseInt(this.recipe.preparationTimeInMinutes);
                this.recipe.servings = parseInt(this.recipe.servings);
                console.log(this.recipe)
                console.log(session)
                // if (session) {
                    const response = await this.axios.post(this.$root.store.server_domain + "/users/createARecipe",
                        {
                            recipe: this.recipe,
                        },
                        {
                            withCredentials: true,
                        }
                    )
                    console.log(response)
                    console.log(response.data)
                // }
                // else {
                //     alert("no cookies, need to re-login");
                // }
                // close model
                this.$bvModal.hide('recipeCreation');
            }
        },
        addNewInstruction() {
            this.recipe.instructions.push({
                instruction: '',
            });

        },
        addNewIngredient() {
            this.recipe.ingredients.push({
                name: '',
                amount: '',
            })
        },
    }
};
</script>
<style scoped>
#btnSubmit {
    margin-left: 15vh;
    margin-bottom: 5vh;
}

#btnCancel {
    margin-left: 5vh;
    margin-bottom: 5vh;
}

.modal-container {
    padding-left: 30px;
}
</style>
import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/create",
    name: "createARecipe",
    component: () => import("./components/CreateRecipeModal")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About")
  },
  {
    path: "/users/favorites",
    name: "myFavorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/users/userRecipes",
    name: "myRecipes",
    component: () => import("./pages/UserRecipesPage"),
  },
  {
    path: "/users/myFamilyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;

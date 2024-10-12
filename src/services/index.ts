import recipeController from "./recipes";
import ingredientController from "./ingredients";
import groceryListController from "./grocery-lists";

export const API = {
    recipe: recipeController,
    ingredient: ingredientController,
    groceryList: groceryListController,
};
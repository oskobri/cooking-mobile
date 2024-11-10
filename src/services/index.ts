import recipeController from "./recipes";
import ingredientController from "./ingredients";
import groceryListController from "./grocery-lists";
import userController from "./users";

export const API = {
    recipe: recipeController,
    ingredient: ingredientController,
    groceryList: groceryListController,
    user: userController,
};
export class LocalStorageManager {
  static getCategoriesList() {
    return JSON.parse(localStorage.getItem("categoriesList")) || [];
  }

  static setCategoriesList(categories) {
    localStorage.setItem("categoriesList", JSON.stringify(categories));
  }

  static getRecipesList() {
    return JSON.parse(localStorage.getItem("recipesList")) || [];
  }

  static setRecipesList(recipes) {
    localStorage.setItem("recipesList", JSON.stringify(recipes));
  }

  static getFavorites() {
    return JSON.parse(localStorage.getItem("favoriteList")) || [];
  }

  static setFavorites(recipes) {
    localStorage.setItem("favoriteList", JSON.stringify(recipes));
  }
}

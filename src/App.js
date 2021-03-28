import "./styles.css";
import { useEffect, useState } from "react";
import { LocalStorageManager } from "./LocalStorageManager";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { recipes, categoriesList } from "./data";
//
import { PreviewPage } from "./components/PreviewPage";
import { RecipeForm } from "./components/RecipeForm";
import { Recipe } from "./components/Recipe";
import { Header } from "./components/Header";
import { FavoriteRecipesList } from "./components/FavoriteRecipesList";
// LocalStorageManager.getCategoriesList()

// LocalStorageManager.setRecipesList(recipes)
export default function App() {
  const [recipesList, setRecipesList] = useState([
    ...LocalStorageManager.getRecipesList()
  ]);
  const [favoriteIdList, setFavoriteIdList] = useState(
    LocalStorageManager.getFavorites()
  );

  function addRecipe(newRecipe) {
    const updatedRecipesList = [...recipesList, newRecipe];
    LocalStorageManager.setRecipesList(updatedRecipesList);
    setRecipesList(updatedRecipesList);
  }

  function addFavorite(id) {
    if (!favoriteIdList.includes(id)) {
      const updatedList = [...favoriteIdList, id];
      LocalStorageManager.setFavorites(updatedList);
      setFavoriteIdList(updatedList);
    }
  }

  function removeFavorite(id) {
    const updatedList = favoriteIdList.filter((recipeId) => recipeId !== id);
    LocalStorageManager.setFavorites(updatedList);
    setFavoriteIdList(updatedList);
  }

  function getFavoriteResipes() {
    return recipesList.filter((recipe) => favoriteIdList.includes(recipe.id));
  }
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <PreviewPage
              recipesList={recipesList}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favoriteIdList={favoriteIdList}
            />
          </Route>
          <Route path="/form">
            <RecipeForm
              addRecipe={addRecipe}
              initialCategories={categoriesList}
            />
          </Route>
          <Route path="/favorites">
            <FavoriteRecipesList
              favoriteIdList={favoriteIdList}
              favoriteRecipes={getFavoriteResipes()}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/recipe/:id">
            <Recipe
              recipes={recipesList}
              favoriteIdList={favoriteIdList}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Route>
          <Route path="/category/:tag">
            <PreviewPage
              recipesList={recipesList}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              favoriteIdList={favoriteIdList}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

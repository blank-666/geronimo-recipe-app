import "./styles.css";
import { useEffect, useState } from "react";
import { LocalStorageManager } from "./LocalStorageManager";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { recipes, categoriesList } from "./data";
import { getFavoriteRecipes, getCategories, getRecipes } from "./api";
//
import { PreviewPage } from "./components/PreviewPage";
import { RecipeForm } from "./components/RecipeForm";
import { Recipe } from "./components/Recipe";
import { Header } from "./components/Header";
import { FavoriteRecipesList } from "./components/FavoriteRecipesList";
import { CategoryPage } from "./components/CategoryPage";

export default function App() {
  const [favoriteIdList, setFavoriteIdList] = useState(
    LocalStorageManager.getFavorites()
  );
  const [recipesList, setRecipesList] = useState();
  const [categoriesList, setCategoriesList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState();

  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      const categories = await getCategories();
      const recipes = await getRecipes();
      setCategoriesList(categories);
      setRecipesList(recipes);
      setIsLoading(false);
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      const results = await getFavoriteRecipes(favoriteIdList);
      setFavoriteRecipes(results);
    }
    fetchFavorites();
  }, [favoriteIdList]);

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

  return (
    <div className="App">
      <Router>
        <Header />

        {isLoading ? (
          <p className="loader" />
        ) : (
          <Switch>
            <Route exact path="/">
              <PreviewPage
                initialCategoriesList={categoriesList}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                favoriteIdList={favoriteIdList}
              />
            </Route>
            <Route path="/form">
              <RecipeForm initialCategoriesList={categoriesList} />
            </Route>
            <Route path="/favorites">
              <FavoriteRecipesList
                favoriteIdList={favoriteIdList}
                favoriteRecipes={favoriteRecipes}
                removeFavorite={removeFavorite}
              />
            </Route>
            <Route path="/recipe/:id">
              <Recipe
                favoriteIdList={favoriteIdList}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            </Route>
            <Route path="/category/:category">
              <CategoryPage
                initialRecipesList={recipesList}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                favoriteIdList={favoriteIdList}
              />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

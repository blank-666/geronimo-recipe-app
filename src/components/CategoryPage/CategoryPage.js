import s from "./CategoryPage.module.scss";
import { Link, useParams } from "react-router-dom";
import { RecipesList } from "../RecipesList";
import { useState, useEffect } from "react";

export function CategoryPage({
  initialRecipesList,
  addFavorite,
  removeFavorite,
  favoriteIdList,
}) {
  const [recipesList, setRecipesList] = useState();
  let { category } = useParams();

  useEffect(() => {
    const filteredRecipes = initialRecipesList.filter((recipe) =>
      recipe.categories.includes(category)
    );
    setRecipesList(filteredRecipes);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.linkContainer}>
          <Link to="/">All recipes</Link>
        </div>
        <h1 className={s.title}>Recipes by category '{category}'</h1>
      </div>
      <div className={s.content}>
        <RecipesList
          recipesList={recipesList}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favoriteIdList={favoriteIdList}
        />
      </div>
    </div>
  );
}

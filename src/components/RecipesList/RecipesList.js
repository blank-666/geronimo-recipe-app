import { RecipeCard } from "../RecipeCard";
import s from "./RecipesList.module.scss";

export function RecipesList({
  recipesList,
  addFavorite,
  removeFavorite,
  favoriteIdList
}) {
  return (
    <div className={s.recipesList}>
      {recipesList[0] &&
        recipesList.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            //
            addFavorite={() => addFavorite(recipe.id)}
            removeFavorite={() => removeFavorite(recipe.id)}
            isFavorite={favoriteIdList.includes(recipe.id)}
          />
        ))}
    </div>
  );
}

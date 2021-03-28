import s from "./FavoriteRecipesList.module.scss";
import defaultDish from "../../icons/dish.png";
import selectedBookmark from "../../icons/selected-bookmark.svg";
import { RecipesList } from "../RecipesList";

export function FavoriteRecipesList({
  favoriteRecipes,
  favoriteIdList,
  removeFavorite
}) {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.bookmark}>
          <img src={selectedBookmark} alt="" />
        </div>
        <h1 className={s.title}>My favorite recipes book</h1>
        <p className={s.comment}>what I love</p>
      </div>
      <div className={s.content}>
        {favoriteRecipes[0] ? (
          <RecipesList
            recipesList={favoriteRecipes}
            removeFavorite={removeFavorite}
            favoriteIdList={favoriteIdList}
          />
        ) : (
          <div className={s.notFound}>
            <div className={s.defaultImage}>
              <img src={defaultDish} alt="" />
            </div>
            <h3 className={s.defaultMessage}>
              There are no favorite recipes in your book yet.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

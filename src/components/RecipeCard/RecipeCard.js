import s from "./RecipeCard.module.scss";
import clock from "../../icons/clock.svg";
import restaurant from "../../icons/restaurant.svg";
import bookmark from "../../icons/bookmark.svg";
import defaultDish from "../../icons/dish.png";
import selectedBookmark from "../../icons/selected-bookmark.svg";
import { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { formatTime } from "../../helpers";
//
import { IngredientsList } from "../IngredientsList";

export function RecipeCard({
  recipe,
  addFavorite,
  removeFavorite,
  isFavorite,
}) {
  const [ingredientsActive, setIngredientsActive] = useState(false);

  function toggleFavorite() {
    if (!isFavorite) {
      addFavorite();
    } else {
      removeFavorite();
    }
  }

  return (
    <div className={s.container}>
      <div>
        <div className={s.image}>
          <img src={!!recipe.image ? recipe.image : defaultDish} alt="" />
        </div>
        <div className={s.content}>
          <ul className={s.categories}>
            {recipe.categories.map((category) => (
              <li key={`${category}_wrap`} className={s.category}>
                <Link key={category} to={`/category/${category}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className={s.title}>
            <Link to={`/recipe/${recipe.id}`}> {recipe.name}</Link>
          </h3>
          <div className={s.autorContainer}>
            Author: <span>{recipe.autor || "unknown"}</span>
          </div>
          <div className={s.detailsContainer}>
            <button
              className={s.ingredientsButton}
              onClick={() => setIngredientsActive(!ingredientsActive)}
            >
              {recipe.ingredients.length} ingredients
              <div className={s.arrowContainer}>
                <p className={ingredientsActive ? s.arrowUp : s.arrowDown} />
              </div>
            </button>
            <span className={s.detailsItem}>
              <img src={restaurant} alt="" />
              {recipe.portions} portions
            </span>
            <span className={s.detailsItem}>
              <img src={clock} alt="" />
              {recipe.duration >= 60
                ? formatTime(recipe.duration)
                : recipe.duration + " minutes"}
            </span>
            <div
              className={classnames({
                [s.dropdownVisible]: ingredientsActive,
                [s.dropdownHidden]: !ingredientsActive,
              })}
            >
              <div className={s.dropdownContent}>
                <IngredientsList
                  mini
                  ingredients={recipe.ingredients}
                  recipeId={recipe.id}
                  initialPortions={recipe.portions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={s.favoriteButtonContainer}
        style={{ marginTop: ingredientsActive && "-30px" }}
      >
        <button className={s.favoriteButton} onClick={toggleFavorite}>
          <div className={s.bookmark}>
            <img src={isFavorite ? selectedBookmark : bookmark} alt="" />
          </div>
          {isFavorite ? "Remove from recipe book" : "Add to recipe book"}
        </button>
      </div>
    </div>
  );
}

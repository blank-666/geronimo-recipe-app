import s from "./Recipe.module.scss";
import clock from "../../icons/clock.svg";
import restaurant from "../../icons/restaurant.svg";
import bookmark from "../../icons/bookmark.svg";
import selectedBookmark from "../../icons/selected-bookmark.svg";
import { Link, useParams } from "react-router-dom";
//
import { IngredientsList } from "../IngredientsList";

export function Recipe({
  recipes,
  favoriteIdList,
  addFavorite,
  removeFavorite,
}) {
  let { id } = useParams();
  const recipe = recipes.filter((recipe) => recipe.id === id)[0];
  const isFavorite = favoriteIdList.includes(recipe.id);
  return (
    <div className={s.container}>
      <div className={s.header}>
        <ul className={s.categories}>
          {recipe.categories &&
            recipe.categories.map((category) => (
              <li key={category}>
                <Link key={category} to={`/category/${category}`}>
                  {category}
                </Link>
              </li>
            ))}
        </ul>
        <h1 className={s.title}>{recipe.name}</h1>
      </div>
      <div className={s.info}>
        <span className={s.infoItem}>
          <img src={restaurant} alt="" />
          <span>{recipe.portions}</span>
        </span>
        <span className={s.infoItem}>
          <img src={clock} alt="" />
          <span>{recipe.duration} minutes</span>
        </span>
        <span className={s.infoItem}>
          <button
            type="button"
            onClick={() => {
              isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id);
            }}
          >
            <img src={isFavorite ? selectedBookmark : bookmark} alt="" />
            <span>
              {isFavorite ? "Remove from recipe book" : "Add to recipe book"}
            </span>
          </button>
        </span>
      </div>
      {recipe.image && (
        <div className={s.imageContainer}>
          <img src={recipe.image} alt="" />
        </div>
      )}
      <div className={s.autorContainer}>
        <p>Recipe autor</p>
        {recipe.autor ? (
          <span>Autor: {recipe.autor}</span>
        ) : (
          <span>Autor: unknown</span>
        )}
      </div>
      <IngredientsList
        ingredients={recipe.ingredients}
        recipeId={recipe.id}
        initialPortions={recipe.portions}
      />
      <div className={s.descriptionContainer}>
        <p className={s.descriptionTitle}>Description</p>
        <ul>
          {recipe.description.map((step, index) => (
            <li key={recipe.id + "_" + index} className={s.recipeStep}>
              <div className={s.instructionContainer}>
                {step.image && (
                  <div className={s.stepImage}>
                    <img src={step.image} alt="" />
                  </div>
                )}
                <span className={s.stepLabel}>{index + 1}. </span>
                <span className={s.instruction}>{step.descriptionText}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

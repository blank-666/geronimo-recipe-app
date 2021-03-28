import s from "./IngredientsList.module.scss";
import classnames from "classnames";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function IngredientsList({
  mini,
  ingredients,
  initialPortions,
  recipeId
}) {
  const [updatedPortions, setUpdatedPortions] = useState(initialPortions);
  const initialshoppingList = sortShoppingList(
    ingredients.map((ingredient, index) => ({
      id: index + 1,
      ingredient: { ...ingredient },
      done: false
    }))
  );
  const [shoppingList, setShoppingList] = useState(initialshoppingList);

  // const sortedIngredients = sortIngredientsByAmount(ingredients);

  // function sortIngredientsByAmount(ingredients) {
  //   const sortedIngredients = ingredients.sort((a, b) => b.amount - a.amount);
  //   return sortedIngredients;
  // }

  function onChangeBox(indexOfCheckedItem) {
    const checkedItem = shoppingList.splice(indexOfCheckedItem, 1)[0];
    const updatedShoppingList = [
      ...shoppingList,
      { ...checkedItem, done: !checkedItem.done }
    ];
    setShoppingList(updatedShoppingList);
  }

  function sortShoppingList(items) {
    const sortedShoppingList = items.sort((a, b) => {
      if (!a.done && !b.done) {
        return b.ingredient.amount - a.ingredient.amount;
      } else if (b.done) {
        return -1;
      } else return 1;
    });
    return sortedShoppingList;
  }

  function updateAmount(amount, unit) {
    if (updatedPortions >= 1 && updatedPortions < 16) {
      if (!amount) return "";
      let updatedAmount = (amount / initialPortions) * updatedPortions;
      let updatedUnit = unit;
      if (updatedAmount < 1 || updatedAmount >= 1000) {
        [updatedAmount, updatedUnit] = updateUnit(updatedAmount, unit);
      }
      return Number.isInteger(updatedAmount)
        ? updatedAmount + " " + updatedUnit
        : updatedAmount.toFixed(1) + " " + updatedUnit;
    } else if (updatedPortions <= 1) {
      setUpdatedPortions(1);
    } else if (updatedPortions > 15) {
      setUpdatedPortions(15);
    }
  }

  function updateUnit(amount, unit) {
    switch (unit) {
      case "g":
        if (amount >= 1000) {
          return [amount / 1000, "kg"];
        }
        break;
      case "kg":
        if (amount < 1) {
          return [amount * 1000, "g"];
        }
        break;
      case "ml":
        if (amount >= 1000) {
          return [amount / 1000, "l"];
        }
        break;
      case "l":
        if (amount < 1) {
          return [amount * 1000, "ml"];
        }
        break;
      default:
        return [amount, unit];
    }
  }
  return (
    <div
      className={classnames({
        [s.miniIngrediensList]: mini,
        [s.ingredientsList]: !mini
      })}
    >
      <div className={s.ingredientsHeader}>
        <p>Ingredients</p>
        <div className={s.portionsControl}>
          <span>portions</span>
          <button onClick={() => setUpdatedPortions(updatedPortions - 1)}>
            −
          </button>
          <input
            value={updatedPortions}
            onChange={(e) => setUpdatedPortions(e.target.value)}
          ></input>
          <button
            onClick={() => setUpdatedPortions(Number(updatedPortions) + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={s.content}>
        {sortShoppingList(shoppingList).map((item, index) => (
          <p
            key={`${item.ingredient.name}_${item.ingredient.id}`}
            className={classnames({
              [s.contentItem]: !item.done,
              [s.checkedContentItem]: item.done
            })}
          >
            <span className={s.name}>
              {mini ? (
                <span>{item.ingredient.name}</span>
              ) : (
                <label className={s.customCheckbox}>
                  <input type="checkbox" onClick={() => onChangeBox(index)} />
                  <span>{item.ingredient.name}</span>
                </label>
              )}
            </span>
            <span className={s.amount}>
              {updateAmount(item.ingredient.amount, item.ingredient.unit)}
            </span>
          </p>
        ))}
        {/* {sortedIngredients.map((ingredient) => (
          <p key={`${ingredient.name}${recipeId}`} className={s.contentItem}>
            <span className={s.name}>
              <span>{ingredient.name}</span>
            </span>
            <span className={s.amount}>
              {updateAmount(ingredient.amount, ingredient.unit)}
            </span>
          </p>
        ))} */}
      </div>
      {mini && (
        <Link className={s.toRecipeButton} to={`/recipe/${recipeId}`}>
          Go to recipe page
        </Link>
      )}
    </div>
  );
}

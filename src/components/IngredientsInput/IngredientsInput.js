// import s from "./RecipeForm/RecipeForm.module.scss";
import s from "./IngredientsInput.module.scss";
import { v4 as uuid } from "uuid";
import classnames from "classnames";
import { useState } from "react";
import { Input } from "../Input/Input";
import { UnitSelect } from "../UnitSelect";

const initialIngredient = { name: "", unit: "", amount: "" };

function IngredientsList({
  ingredientsList,
  setIngredientsList,
  findErrors,
  errors
}) {
  function editIngredient(editedItem, field, index) {
    const updatedIngredients = [...ingredientsList];
    updatedIngredients[index][field] = editedItem;
    setIngredientsList(updatedIngredients);
  }
  function removeIngredient(idToRemove) {
    const updatedIngredients = ingredientsList.filter(
      ({ id }) => id !== idToRemove
    );
    setIngredientsList(updatedIngredients);
  }

  return (
    <div className={s.ingredientsList}>
      {ingredientsList.map((ingredient, index) => (
        <div key={ingredient.id}>
          <div className={s.ingredientContainer}>
            <div className={s.pseudoInput}>
              <Input
                type="text"
                multiple
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) => editIngredient(e.target.value, "name", index)}
                autoComplete="off"
              />
              <Input
                type="number"
                multiple
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) =>
                  editIngredient(e.target.value, "amount", index)
                }
                autoComplete="off"
              />
              <UnitSelect
                options={["g", "kg", "ml", "l", "tbsp", "tspn", "pieces"]}
                value={ingredient.unit}
                edit="true"
                onChange={(e) => editIngredient(e.target.value, "unit", index)}
              />
            </div>
            <div className={s.removeItem}>
              <button
                type="button"
                onClick={() => removeIngredient(ingredient.id)}
              >
                ✖
              </button>
            </div>
          </div>
          <p className={classnames(s.errorMessage, s.ingredientError)}>
            {errors &&
              findErrors(errors, index).map((errorMessage) => errorMessage)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function IngredientsInput({
  isEdit,
  ingredientsList,
  setIngredientsList,
  errors,
  findErrors
}) {
  const [newIngredient, setNewIngredient] = useState(initialIngredient);

  function ingredientHandleChange(value, field) {
    setNewIngredient({ ...newIngredient, [field]: value });
  }

  function addIngredient() {
    const updatedIngredients = [
      ...ingredientsList,
      { ...newIngredient, id: uuid() }
    ];
    setIngredientsList(updatedIngredients);
    setNewIngredient(initialIngredient);
  }
  return (
    <>
      <div className={s.ingredientContainer}>
        <div className={s.pseudoInput}>
          <Input
            type="text"
            multiple
            placeholder="Name"
            value={newIngredient.name}
            onChange={(e) => ingredientHandleChange(e.target.value, "name")}
            autoComplete="off"
          />
          <Input
            type="number"
            multiple
            placeholder="Amount"
            value={newIngredient.amount}
            onChange={(e) => ingredientHandleChange(e.target.value, "amount")}
            autoComplete="off"
          />
          <UnitSelect
            options={["g", "kg", "ml", "l", "tbsp", "tspn", "pieces"]}
            value={newIngredient.unit}
            edit={isEdit}
            onChange={(e) => ingredientHandleChange(e.target.value, "unit")}
          />
        </div>
        <div className={s.addItem}>
          <button type="button" onClick={() => addIngredient()}>
            Add ingredient
          </button>
        </div>
      </div>
      {ingredientsList[0] && (
        <IngredientsList
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
          findErrors={findErrors}
          errors={errors}
        />
      )}
    </>
  );
}

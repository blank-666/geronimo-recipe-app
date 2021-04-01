import s from "./IngredientsInput.module.scss";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Input } from "../Input/Input";
import { UnitSelect } from "../UnitSelect";
import { EditableIngredientsList } from "./EditableIngredientsList";

const initialIngredient = { name: "", unit: "", amount: "" };
const UNITS = ["g", "kg", "ml", "l", "tbsp", "tspn", "pieces", "pinch"];

export function IngredientsInput({
  isEdit,
  ingredientsList,
  setIngredientsList,
  errors,
  findErrors,
}) {
  const [newIngredient, setNewIngredient] = useState(initialIngredient);

  function ingredientHandleChange(value, field) {
    setNewIngredient({ ...newIngredient, [field]: value });
  }

  function addIngredient() {
    const updatedIngredients = [
      ...ingredientsList,
      { ...newIngredient, id: uuid() },
    ];
    setIngredientsList(updatedIngredients);
    setNewIngredient(initialIngredient);
  }

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
            options={UNITS}
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
        <EditableIngredientsList
          ingredientsList={ingredientsList}
          editIngredient={editIngredient}
          removeIngredient={removeIngredient}
          findErrors={findErrors}
          errors={errors}
          options={UNITS}
        />
      )}
    </>
  );
}

import { Input } from "../Input/Input";
import { UnitSelect } from "../UnitSelect";
import s from "./IngredientsInput.module.scss";
import classnames from "classnames";

export function EditableIngredientsList({
  ingredientsList,
  editIngredient,
  removeIngredient,
  findErrors,
  errors,
  options,
}) {
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
                options={options}
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

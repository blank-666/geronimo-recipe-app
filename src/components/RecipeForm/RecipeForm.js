import s from "./RecipeForm.module.scss";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { postNewRecipe } from "../../api";
//
import { IngredientsInput } from "../IngredientsInput";
import { DescriptionInput } from "../DescriptionInput";
import { TimeInput } from "../TimeInput";
import { Input } from "../Input";
import { CategorySelect } from "../CategorySelect";

function Container({ label, children }) {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{label}</label>
      {children}
    </div>
  );
}

const initialRecipe = {
  name: "",
  image: "",
  categories: [],
  ingredients: [],
  duration: "",
  portions: "",
  autor: "",
  description: [],
};

export function RecipeForm({ addRecipe, initialCategoriesList }) {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [errors, setErrors] = useState({});

  function formatName(name) {
    const editedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return editedName;
  }

  function addCustomCategory(category) {
    addCategory(formatName(category));
  }

  function addCategory(selectedCategory) {
    setRecipe({
      ...recipe,
      categories: [...recipe.categories, selectedCategory],
    });
  }

  function removeCategory(categoryToRemove) {
    const updatedCategories = recipe.categories.filter(
      (category) => category !== categoryToRemove
    );
    setRecipe({ ...recipe, categories: updatedCategories });
  }

  function handleInputChange(value, field) {
    setRecipe({ ...recipe, [field]: value });
  }

  function setRecipeItems(updatedItems, field) {
    setRecipe({ ...recipe, [field]: updatedItems });
  }

  function addDuration(newDuration) {
    const convertedDuration =
      Number(newDuration.hours) * 60 + Number(newDuration.minutes);
    setRecipe({ ...recipe, duration: convertedDuration });
  }

  function validate() {
    let errors = {
      name: "",
      duration: "",
      portions: "",
      ingredients: "",
      description: "",
      ingredientsErrors: [],
      descriptionErrors: [],
    };
    let formIsValid = true;

    const required = (overrides) => ({
      isValid: (value) => !!value,
      message: "Required",
      ...overrides,
    });

    const isString = (overrides) => ({
      isValid: (value) => /^([а-яёА-Я]+|[ a-zA-Z]+)/.test(value),
      message: "Must be a string",
      ...overrides,
    });

    const isNotEmpty = (overrides) => ({
      isValid: (value) => value.length > 0,
      message: "Add at least one item",
      ...overrides,
    });

    const isPositiveNumber = (overrides) => ({
      isValid: (value) => value > 0,
      message: "Cannot be null or negative number",
      ...overrides,
    });

    const isWord = (overrides) => ({
      isValid: (value) => value.length >= 3,
      message: "At least three letters",
      ...overrides,
    });

    const inValidRange = (overrides) => ({
      isValid: (value) => value >= 1 && value <= 15,
      message: "The number must be between 1 and 15",
      ...overrides,
    });

    const schema = {
      name: {
        rules: [
          required({ message: "Cannot be empty" }),
          isString({ message: "Only letters" }),
          isWord(),
        ],
      },
      duration: {
        rules: [
          required({ message: "Cannot be empty" }),
          isPositiveNumber({
            message: "Duration cannot be null or negative number",
          }),
        ],
      },
      portions: {
        rules: [
          required({ message: "Cannot be empty" }),
          isPositiveNumber({
            message: "Portions cannot be null or negative number",
          }),
          inValidRange(),
        ],
      },
      ingredients: {
        rules: [isNotEmpty({ message: "Add at least one ingredient" })],
        name: {
          rules: [
            required({ message: "Cannot be empty" }),
            isString({ message: "Only letters" }),
            isWord(),
          ],
        },
      },
      description: {
        rules: [isNotEmpty({ message: "Add at least one description step" })],
        descriptionText: {
          rules: [required({ message: "Cannot be empty" }), isWord()],
        },
      },
    };

    for (let key in errors) {
      const fieldName = Object.keys(schema).find((item) => item === key);
      if (fieldName) {
        schema[fieldName].rules.forEach((rule) => {
          const errorMessage = !rule.isValid(recipe[fieldName]) && rule.message;
          if (errorMessage && errors[fieldName].length < 1) {
            errors[fieldName] = errorMessage;
          }
        });
      } else if (key === "ingredientsErrors") {
        recipe.ingredients.forEach((ingredient, index) => {
          schema.ingredients.name.rules.forEach((rule) => {
            const errorMessage = !rule.isValid(ingredient.name) && rule.message;
            if (errorMessage) {
              const error = {
                id: index,
                message: errorMessage,
              };
              errors.ingredientsErrors.push(error);
            }
          });
        });
      } else if (key === "descriptionErrors") {
        recipe.description.forEach((step, index) => {
          schema.description.descriptionText.rules.forEach((rule) => {
            const errorMessage =
              !rule.isValid(step.descriptionText) && rule.message;
            if (errorMessage) {
              const error = {
                id: index,
                message: errorMessage,
              };
              errors.descriptionErrors.push(error);
            }
          });
        });
      }
    }

    formIsValid = Object.values(errors).every((error) => !error[0]);
    setErrors({ ...errors });
    return formIsValid;
  }

  function isImage(url) {
    const reg = /\.(gif|jpe?g|tiff?|png|svg|webp|bmp)$/i;
    return reg.test(url);
  }

  function findErrors(errors, index) {
    let errorsMessages = [];
    errors
      .filter((error) => error.id === index)
      .map((error) => {
        return errorsMessages.length < 1 && errorsMessages.push(error.message);
      });
    return errorsMessages;
  }

  function reset() {
    setRecipe(initialRecipe);
  }

  async function postRecipe() {
    await postNewRecipe(recipe);
  }

  function handleSubmit(e) {
    if (validate()) {
      postRecipe();
      // addRecipe(recipe);
      reset();
      e.preventDefault();
    } else {
      e.preventDefault();
      alert("No no no");
    }
  }

  // function handleSubmit(e) {
  //   if (validate()) {
  //     addRecipe(recipe);
  //     reset();
  //     e.preventDefault();
  //   } else {
  //     e.preventDefault();
  //     alert("No no no");
  //   }
  // }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>Recipe form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Container label="Recipe name*">
          <Input
            width="350px"
            placeholder="Recipe name"
            value={recipe.name}
            onChange={(e) => handleInputChange(e.target.value, "name")}
          />
          <p className={s.errorMessage}>{errors.name}</p>
        </Container>

        <Container label="Categories">
          <CategorySelect
            initialOptions={initialCategoriesList}
            selectedCategories={recipe.categories}
            addCategory={addCategory}
            removeCategory={removeCategory}
            addCustomCategory={addCustomCategory}
          />
        </Container>

        <Container label="Image">
          <Input
            image
            placeholder="Image url"
            value={recipe.image}
            onChange={(e) => handleInputChange(e.target.value, "image")}
          />
          {recipe.image.length > 0 &&
            (isImage(recipe.image) ? (
              <img src={recipe.image} alt="Invalid url" />
            ) : (
              <p className={s.errorMessage}>Invalid url</p>
            ))}
        </Container>

        <Container label="Ingredients*">
          <IngredientsInput
            setIngredientsList={(value) => setRecipeItems(value, "ingredients")}
            ingredientsList={recipe.ingredients}
            errors={errors.ingredientsErrors}
            findErrors={findErrors}
          />
          <p className={s.errorMessage}>{errors.ingredients}</p>
        </Container>

        <Container label="Duration*">
          <TimeInput addDuration={addDuration} />
          <p className={s.errorMessage}>{errors.duration}</p>
        </Container>

        <Container label="Portions*">
          <Input
            type="number"
            width="350px"
            placeholder="Portions"
            value={recipe.portions}
            onChange={(e) => handleInputChange(e.target.value, "portions")}
          />
          <p className={s.errorMessage}>{errors.portions}</p>
        </Container>

        <Container label="Autor">
          <Input
            width="350px"
            placeholder="Autor"
            value={recipe.autor}
            onChange={(e) => handleInputChange(e.target.value, "autor")}
          />
        </Container>

        <Container label="Description">
          <DescriptionInput
            descriptionList={recipe.description}
            setDescriptionList={(value) => setRecipeItems(value, "description")}
            isImage={isImage}
            findErrors={findErrors}
            errors={errors.descriptionErrors}
          />
          <p className={s.errorMessage}>{errors.description}</p>
        </Container>
        <button className={s.submit} type="submit">
          Add recipe
        </button>
      </form>
    </div>
  );
}

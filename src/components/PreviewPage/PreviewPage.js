import { useState, useEffect } from "react";
import { LocalStorageManager } from "../../LocalStorageManager";
import s from "./PreviewPage.module.scss";
import sad from "../../icons/sad.svg";
import { useParams } from "react-router-dom";
//
import { SearchInput } from "../SearchInput";
import { RecipesList } from "../RecipesList";

const initialSearchFilter = { word: "", categories: [] };
let firstRender = true;

export function PreviewPage({
  categoriesList,
  recipesList,
  addFavorite,
  removeFavorite,
  favoriteIdList,
}) {
  const [foundRecipes, setFoundRecipes] = useState(recipesList);
  const [searchFilter, setSearchFilter] = useState(initialSearchFilter);

  let { tag } = useParams();

  let categoriesOptions = categoriesList.filter(
    (category) => !searchFilter.categories.includes(category)
  );

  useEffect(() => {
    if (!!tag && !searchFilter.categories.includes(tag)) {
      addCategory(tag);
      searchRecipe();
    }
  }, [tag]);

  useEffect(() => {
    if (!firstRender) {
      searchRecipe();
    }
    firstRender = false;
  }, [searchFilter]);

  function handleSearchChange(value) {
    setSearchFilter({ ...searchFilter, word: value });
  }

  function addCategory(selectedCategory) {
    setSearchFilter({
      ...searchFilter,
      categories: [...searchFilter.categories, selectedCategory],
    });
  }

  function removeCategory(categoryToRemove) {
    const updatedCategories = searchFilter.categories.filter(
      (category) => category !== categoryToRemove
    );
    setSearchFilter({ ...searchFilter, categories: updatedCategories });
    // move this to select maybe???\/
    categoriesOptions = [...categoriesList, categoryToRemove];
  }

  function isMatch(categories, searchCategories) {
    const result = searchCategories
      .map((searchCategory) => {
        return categories.includes(searchCategory);
      })
      .every((match) => !!match);

    return result;
  }

  function searchRecipe() {
    const updatedRecipesList = recipesList.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchFilter.word.toLowerCase()) &&
        isMatch(recipe.categories, searchFilter.categories)
    );
    setFoundRecipes(updatedRecipesList);
  }
  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <SearchInput
          searchWord={searchFilter.word}
          onChange={handleSearchChange}
          options={categoriesOptions}
          selectedCategories={searchFilter.categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
      </div>

      <div className={s.searchResults}>
        {foundRecipes[0] ? (
          <RecipesList
            recipesList={foundRecipes}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favoriteIdList={favoriteIdList}
          />
        ) : (
          <div className={s.notFound}>
            <div className={s.notFoundImage}>
              <img src={sad} alt="" />
            </div>
            <h1 className={s.notFoundMessage}>
              No results for '<p>{searchFilter.word}</p>'
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

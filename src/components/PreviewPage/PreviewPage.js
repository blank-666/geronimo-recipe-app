import { useState, useEffect } from "react";
import s from "./PreviewPage.module.scss";
import sad from "../../icons/sad.svg";
//
import { SearchInput } from "../SearchInput";
import { RecipesList } from "../RecipesList";
import { searchRecipes } from "../../api";

const initialSearchFilter = { word: "", categories: [] };
let firstRender = true;

export function PreviewPage({
  initialCategoriesList,
  initialRecipesList,
  addFavorite,
  removeFavorite,
  favoriteIdList,
}) {
  const [searchResults, setSearchResults] = useState(initialRecipesList);
  const [searchFilter, setSearchFilter] = useState(initialSearchFilter);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      async function fetchData() {
        setIsLoading(true);
        const results = await searchRecipes(
          searchFilter.word,
          searchFilter.categories
        );
        setSearchResults(results);
        setIsLoading(false);
      }
      fetchData();
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
  }

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <SearchInput
          searchWord={searchFilter.word}
          onChange={handleSearchChange}
          options={initialCategoriesList}
          selectedCategories={searchFilter.categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
      </div>

      <div className={s.searchResults}>
        {searchResults && searchResults[0] ? (
          <RecipesList
            recipesList={searchResults}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favoriteIdList={favoriteIdList}
          />
        ) : isLoading ? (
          <p className={s.loader} />
        ) : (
          <div className={s.notFound}>
            <div className={s.notFoundImage}>
              <img src={sad} alt="" />
            </div>
            <h1 className={s.notFoundMessage}>
              No results {searchFilter.word && <p>for '{searchFilter.word}'</p>}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

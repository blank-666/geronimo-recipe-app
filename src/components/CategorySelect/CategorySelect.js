import { useState } from "react";
import s from "./CategorySelect.module.scss";
import classnames from "classnames";
import { SelectPopUp } from "../SelectPopUp";
import { Tags } from "../Tags";

export function CategorySelect({
  selectedCategories,
  options,
  addCategory,
  removeCategory,
  addCustomCategory,
  multiple,
  search
}) {
  const [searchWord, setSearchWord] = useState("");
  const [active, setActive] = useState(false);

  function handleChange(e) {
    showOptions();
    setSearchWord(e.target.value);
  }

  function showOptions() {
    setActive(true);
  }

  function hideOptions() {
    setSearchWord("");
    setActive(false);
  }

  function onSelect(option) {
    addCategory(option);
    hideOptions();
  }

  function alphabetize(words) {
    const sortedWords = words.sort();
    return sortedWords;
  }

  const updatedOptions = options.filter((category) =>
    category.toLowerCase().includes(searchWord.toLowerCase())
  );
  return (
    <div>
      <div
        className={classnames({
          [s.combinedSelect]: multiple,
          [s.pseudoInput]: !multiple
        })}
        onClick={active ? hideOptions : showOptions}
        onBlur={hideOptions}
      >
        <div className={s.select}>
          <input
            placeholder="Select categories"
            autoComplete="off"
            value={searchWord}
            onChange={handleChange}
          />
          <div className={s.arrowContainer}>
            <p className={active ? s.arrowUp : s.arrowDown} />
          </div>
        </div>
      </div>
      {active && (
        <SelectPopUp
          options={alphabetize(updatedOptions)}
          onSelect={onSelect}
          addCustomOption={addCustomCategory}
          searchWord={searchWord}
        />
      )}
      {!search && (
        <Tags
          selectedCategories={selectedCategories}
          removeCategory={removeCategory}
          search={search}
        />
      )}
    </div>
  );
}

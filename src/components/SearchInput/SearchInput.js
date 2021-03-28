import { Input } from "../Input";
import { CategorySelect } from "../CategorySelect";
import { Tags } from "../Tags";
import search from "../../icons/loupe.svg";
import s from "./SearchInput.module.scss";

export function SearchInput({
  addCategory,
  removeCategory,
  selectedCategories,
  options,
  value,
  onChange
}) {
  return (
    <>
      <div className={s.pseudoInput}>
        <div className={s.icon}>
          <img src={search} alt="" />
        </div>
        <Input
          multiple
          placeholder="Search recipe"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <CategorySelect
          multiple
          search
          addCategory={addCategory}
          selectedCategories={selectedCategories}
          options={options}
        />
      </div>
      <Tags
        selectedCategories={selectedCategories}
        removeCategory={removeCategory}
      />
    </>
  );
}

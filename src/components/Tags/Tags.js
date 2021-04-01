import s from "./Tags.module.scss";

export function Tags({ selectedCategories, removeCategory }) {
  return (
    <div className={s.tagsContainer}>
      {selectedCategories &&
        selectedCategories.map((selectedCategory) => (
          <div key={selectedCategory} className={s.tag}>
            {selectedCategory}
            <button
              type="button"
              onClick={() => removeCategory(selectedCategory)}
            >
              <span>✖</span>
            </button>
          </div>
        ))}
    </div>
  );
}

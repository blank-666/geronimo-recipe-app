import s from "./SelectPopUp.module.scss";

export function SelectPopUp({
  options,
  onSelect,
  addCustomOption,
  searchWord
}) {
  let lastItem;
  if (addCustomOption) {
    lastItem = (
      <button
        type="button"
        className={s.option}
        onMouseDown={() => addCustomOption(searchWord)}
      >
        <span>Create "{searchWord}"</span>
      </button>
    );
  } else {
    lastItem = <div className={s.noOptions}>Not found</div>;
  }

  return (
    <div className={s.optionsList}>
      {options.length > 0
        ? options.map((option) => (
            <div
              className={s.option}
              key={option}
              onMouseDown={() => onSelect(option)}
            >
              {option}
            </div>
          ))
        : lastItem}
    </div>
  );
}

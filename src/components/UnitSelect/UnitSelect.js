import { useState, useEffect } from "react";
import s from "./UnitSelect.module.scss";
import { SelectPopUp } from "../SelectPopUp";

export function UnitSelect({ value, options, onChange }) {
  const [active, setActive] = useState(false);
  const [searchWord, setSearchWord] = useState(value);

  useEffect(() => {
    setSearchWord(value);
  }, [value]);

  function showOptions() {
    setSearchWord("");
    setActive(true);
  }

  function hideOptions(e) {
    setActive(false);
  }

  function onSelect(option) {
    setSearchWord(option);
    hideOptions();
  }

  function handleChange(e) {
    showOptions();
    setSearchWord(e.target.value);
  }
  const updatedOptions = options.filter((unit) =>
    unit.includes(searchWord.toLowerCase())
  );
  return (
    <div className={s.selectContainer}>
      <div
        className={s.select}
        onClick={active ? hideOptions : showOptions}
        onBlur={hideOptions}
      >
        <input
          name="select"
          placeholder="Unit"
          autoComplete="off"
          value={searchWord}
          onChange={handleChange}
          onBlur={(e) => onChange(e)}
        />
        <div className={s.arrowContainer}>
          <p className={active ? s.arrowUp : s.arrowDown} />
        </div>
      </div>
      {active && <SelectPopUp options={updatedOptions} onSelect={onSelect} />}
    </div>
  );
}

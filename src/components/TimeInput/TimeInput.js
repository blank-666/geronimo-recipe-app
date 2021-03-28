import s from "./TimeInput.module.scss";
import { useState } from "react";

const initialDuration = { hours: "", minutes: "" };

export function TimeInput({ addDuration }) {
  const [newDuration, setNewDuration] = useState(initialDuration);

  function durationHandleChange(value, field) {
    setNewDuration({ ...newDuration, [field]: value });
    if (field === "hours") {
      if (value < 0) {
        setNewDuration({ hours: 0, minutes: 0 });
      } else if (value >= 24) {
        setNewDuration({ hours: 24, minutes: 0 });
      }
    }
    if (field === "minutes") {
      if (value < 0) {
        if (newDuration.hours > 0) {
          setNewDuration({ hours: Number(newDuration.hours) - 1, minutes: 59 });
        } else setNewDuration({ hours: 0, minutes: 0 });
      } else if (value > 59) {
        setNewDuration({
          hours: Number(newDuration.hours) + Math.floor(value / 60),
          minutes: value % 60
        });
      }
    }
  }
  return (
    <div className={s.timeInput}>
      <input
        placeholder="hh"
        type="number"
        value={newDuration.hours}
        onChange={(e) => durationHandleChange(e.target.value, "hours")}
        onBlur={() => addDuration(newDuration)}
      />
      :
      <input
        placeholder="mm"
        type="number"
        value={newDuration.minutes}
        onChange={(e) => durationHandleChange(e.target.value, "minutes")}
        onBlur={() => addDuration(newDuration)}
      />
    </div>
  );
}

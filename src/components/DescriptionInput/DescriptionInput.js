import s from "./DescriptionInput.module.scss";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Input } from "../Input";
import { EditableDescriptionList } from "./EditableDescriptionList";

const initialDescriptionStep = { image: "", descriptionText: "" };

export function DescriptionInput({
  descriptionList,
  setDescriptionList,
  isImage,
  findErrors,
  errors,
}) {
  const [newStep, setNewStep] = useState(initialDescriptionStep);

  function descriptionHandleChange(value, field) {
    setNewStep({ ...newStep, [field]: value });
  }

  function addDescriptionStep() {
    const updatedDescription = [...descriptionList, { ...newStep, id: uuid() }];
    setDescriptionList(updatedDescription);
    setNewStep(initialDescriptionStep);
  }

  function editDescription(editedItem, field, index) {
    const updatedDescription = [...descriptionList];
    updatedDescription[index][field] = editedItem;
    setDescriptionList(updatedDescription);
  }

  function removeDescriptionStep(idToRemove) {
    const updatedDescription = descriptionList.filter(
      ({ id }) => id !== idToRemove
    );
    setDescriptionList(updatedDescription);
  }

  return (
    <>
      <Input
        placeholder="Image url"
        value={newStep.image}
        onChange={(e) => descriptionHandleChange(e.target.value, "image")}
      />
      <div className={s.descriptionContainer}>
        {newStep.image.length > 0 && (
          <div className={s.imageContainer}>
            {isImage(newStep.image) ? (
              <img src={newStep.image} alt="Invalid url" />
            ) : (
              <p className={s.errorMessage}>Invalid url</p>
            )}
          </div>
        )}

        <div className={s.pseudoInput}>
          <textarea
            value={newStep.descriptionText}
            placeholder="Describe the step"
            onChange={(e) =>
              descriptionHandleChange(e.target.value, "descriptionText")
            }
          />
        </div>
      </div>
      <div className={s.addItem}>
        <button type="button" onClick={() => addDescriptionStep()}>
          Add step
        </button>
      </div>
      {descriptionList[0] && (
        <EditableDescriptionList
          descriptionList={descriptionList}
          editDescription={editDescription}
          removeDescriptionStep={removeDescriptionStep}
          isImage={isImage}
          errors={errors}
          findErrors={findErrors}
        />
      )}
    </>
  );
}

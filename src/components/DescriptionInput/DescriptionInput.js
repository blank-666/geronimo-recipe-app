import s from "./DescriptionInput.module.scss";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Input } from "../Input";

const initialDescriptionStep = { image: "", descriptionText: "" };

function DescriptionList({
  descriptionList,
  setDescriptionList,
  isImage,
  findErrors,
  errors
}) {
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
      {descriptionList.map((step, index) => (
        <div className={s.descriptionListItem} key={step.id + "div"}>
          <span key={step.id + "span"}>Step {index + 1}</span>
          <div className={s.removeItem}>
            <button
              type="button"
              onClick={() => removeDescriptionStep(step.id)}
            >
              ✖
            </button>
          </div>
          <Input
            placeholder="Image url"
            value={step.image}
            onChange={(e) => editDescription(e.target.value, "image", index)}
          />
          <div className={s.descriptionContainer}>
            {step.image.length > 0 && (
              <div className={s.imageContainer}>
                {isImage(step.image) ? (
                  <img src={step.image} alt="Invalid url" />
                ) : (
                  <p className={s.errorMessage}>Invalid url</p>
                )}
              </div>
            )}

            <div className={s.pseudoInput}>
              <textarea
                wrap="soft"
                value={step.descriptionText}
                placeholder="Describe the step"
                onChange={(e) =>
                  editDescription(e.target.value, "descriptionText", index)
                }
              />
            </div>
          </div>
          <p className={s.errorMessage}>
            {errors &&
              findErrors(errors, index).map((errorMessage) => errorMessage)}
          </p>
        </div>
      ))}
    </>
  );
}

export function DescriptionInput({
  descriptionList,
  setDescriptionList,
  isImage,
  findErrors,
  errors
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
        <DescriptionList
          descriptionList={descriptionList}
          setDescriptionList={setDescriptionList}
          isImage={isImage}
          errors={errors}
          findErrors={findErrors}
        />
      )}
    </>
  );
}

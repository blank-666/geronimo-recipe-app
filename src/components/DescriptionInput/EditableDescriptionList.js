import { Input } from "../Input";
import s from "./DescriptionInput.module.scss";

export function EditableDescriptionList({
  descriptionList,
  editDescription,
  removeDescriptionStep,
  isImage,
  findErrors,
  errors,
}) {
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

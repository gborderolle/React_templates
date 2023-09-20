import EditEntity from "../../utils/EditEntity";
import { urlReviews } from "../../utils/endpoints";
import FormReview from "./FormReview";
import { reviewCreationDTO, reviewDTO } from "./review.model";

export default function EditReview() {
  return (
    <EditEntity<reviewCreationDTO, reviewDTO>
      url={urlReviews}
      urlIndex="/reviews" // Fixed the backslash to forward slash
    >
      {(entity, editEntity) => (
        <FormReview
          formName="Modificar review"
          model={entity}
          onSubmit={(values) => editEntity(values)}
        />
      )}
    </EditEntity>
  );
}

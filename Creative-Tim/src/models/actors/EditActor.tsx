import FormActor from "./FormActor";
import EditEntity from "../../utils/EditEntity";
import { urlActors } from "../../utils/endpoints";
import { actorCreationDTO, actorDTO } from "./actor.model";
import { ConvertActorToFormData } from "../../utils/FormDataUtils";

export default function EditActor() {
  return (
    <EditEntity<actorCreationDTO, actorDTO>
      url={urlActors}
      urlIndex="/actors"
      transformFormData={ConvertActorToFormData}
    >
      {(entity, editEntity) => (
        <FormActor
          formName="Modificar actor"
          model={entity}
          onSubmit={(values) => editEntity(values)}
        />
      )}
    </EditEntity>
  );
}

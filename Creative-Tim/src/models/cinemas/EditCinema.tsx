import EditEntity from "../../utils/EditEntity";
import { urlCinemas } from "../../utils/endpoints";
import FormCinema from "./FormCinema";
import { cinemaCreationDTO, cinemaDTO } from "./cinema.model";

export default function EditCinema() {
  return (
    <EditEntity<cinemaCreationDTO, cinemaDTO>
      url={urlCinemas}
      urlIndex="/cinemas"
    >
      {(entity, editEntity) => (
        <FormCinema
          formName="Modificar cine"
          model={entity}
          onSubmit={(values) => editEntity(values)}
        />
      )}
    </EditEntity>
  );
}

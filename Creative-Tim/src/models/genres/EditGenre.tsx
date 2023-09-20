import EditEntity from "../../utils/EditEntity";
import { urlGenres } from "../../utils/endpoints";
import FormGenre from "./FormGenre";
import { genreCreationDTO, genreDTO } from "./genre.model";

export default function EditGenre() {
  return (
    <EditEntity<genreCreationDTO, genreDTO>
      url={urlGenres}
      urlIndex="/genres"
    >
      {(entity, editEntity) => (
        <FormGenre
          formName="Modificar género"
          model={entity}
          onSubmit={(values) => editEntity(values)}
        />
      )}
    </EditEntity>
  );
}

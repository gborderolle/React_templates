import { useFormikContext } from "formik";
import LeafletMap from "./LeafletMap";
import { coordinateDTO } from "./coordinateDTO";

export default function LeafletMapForm(props: leafletMapFormProps) {
  const { values } = useFormikContext<any>();

  function updateFields(coordinates: coordinateDTO) {
    values[props.fieldLat] = coordinates.latitude;
    values[props.fieldLong] = coordinates.longitude;
  }

  return (
    <LeafletMap
      coordinates={props.coordinates}
      clickMapEvent={updateFields}
      centerInit={
        props.coordinates.length > 0 ? props.coordinates[0] : undefined
      }
    />
  );
}

interface leafletMapFormProps {
  coordinates: coordinateDTO[];
  fieldLat: string;
  fieldLong: string;
  centerInit?: coordinateDTO;
}

LeafletMapForm.defaultProps = {
  coordinates: [],
};

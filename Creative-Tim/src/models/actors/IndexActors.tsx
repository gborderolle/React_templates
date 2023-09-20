import { Container, Row, Col, Card } from "react-bootstrap";
import { urlActors } from "../../utils/endpoints";
import IndexEntity from "../../views/global/IndexEntity";
import { actorDTO } from "./actor.model";

export default function IndexActors() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">

                <IndexEntity<actorDTO>
                  url={urlActors}
                  urlCreate="create"
                  title="Actors"
                >
                  {(actors, buttons) => (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Foto</th>
                          <th>Nacimiento</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(actors) &&
                          actors.map((actor, index) => (
                            <tr key={actor.id}>
                              <td>{index + 1}</td>
                              <td>{actor.name}</td>
                              <td>
                                <div className="actor-image-container">
                                  <img
                                    src={actor.photoURL}
                                    alt="Foto del actor."
                                    className="img-fluid rounded"
                                  />
                                </div>
                              </td>
                              <td>{actor.born?.toString()}</td>
                              <td>{buttons(`edit/${actor.id}`, actor.id)}</td>
                              {/* le paso la función buttons() que es parte del hijo */}
                            </tr>
                          ))}
                      </tbody>
                    </>
                  )}
                </IndexEntity>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

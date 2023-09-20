import { Container, Row, Col, Card } from "react-bootstrap";
import { urlCinemas } from "../../utils/endpoints";
import IndexEntity from "../../views/global/IndexEntity";
import { cinemaDTO } from "./cinema.model";

export default function IndexCinemas() {
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

                <IndexEntity<cinemaDTO>
                  url={urlCinemas}
                  urlCreate="create"
                  title="Cine"
                >
                  {(cinemas, buttons) => (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(cinemas) &&
                          cinemas.map((cinema, index) => (
                            <tr key={cinema.id}>
                              <td>{index + 1}</td>
                              <td>{cinema.name}</td>
                              <td>{buttons(`edit/${cinema.id}`, cinema.id)}</td>
                              {/* le paso la función buttons() que es parte del hijo */}
                            </tr>
                          ))}
                      </tbody>
                    </>
                  )}
                </IndexEntity >

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

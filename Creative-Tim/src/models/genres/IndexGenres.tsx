// Editar: Clase 120: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26020780#overview
// Borrar: Clase 121: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26021230#overview

import { genreDTO } from "./genre.model";
import { Container, Row, Col, Card } from "react-bootstrap";
import { urlGenres } from "../../utils/endpoints";
import IndexEntity from "../../views/global/IndexEntity";

export default function IndexGenres() {
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
                {/* Sistema */}

                <IndexEntity<genreDTO>
                  url={urlGenres}
                  urlCreate="create"
                  title="Géneros"
                >
                  {(genres, buttons) => (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(genres) &&
                          genres.map((genre, index) => (
                            <tr key={genre.id}>
                              <td>{index + 1}</td>
                              <td>{genre.name}</td>
                              <td>{buttons(`edit/${genre.id}`, genre.id)}</td>
                              {/* le paso la función buttons() que es parte del hijo */}
                            </tr>
                          ))}
                      </tbody>
                    </>
                  )}
                </IndexEntity>

                {/* Sistema */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

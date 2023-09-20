import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { urlMovies } from "../../utils/endpoints";
import IndexEntity from "../../views/global/IndexEntity";
import { movieDTO } from "./movie.model";

export default function IndexMovies() {
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

                <IndexEntity<movieDTO>
                  url={urlMovies}
                  urlCreate="create"
                  title="Películas"
                >
                  {(movies, buttons) => (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Título</th>
                          <th>Poster</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(movies) &&
                          movies.map((movie, index) => (
                            <tr key={movie.id}>
                              <td>{index + 1}</td>
                              <td>
                                <Link
                                  key={movie.id}
                                  to={`/movies/${movie.id}`}
                                  className="m-2"
                                >
                                  {movie.title}
                                </Link>
                              </td>
                              <td>
                                <div className="actor-image-container">
                                  <img
                                    src={movie.posterURL}
                                    alt="Poster de la película."
                                    className="img-fluid rounded"
                                  />
                                </div>
                              </td>
                              <td>{movie.description}</td>
                              <td>{buttons(`edit/${movie.id}`, movie.id)}</td>
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

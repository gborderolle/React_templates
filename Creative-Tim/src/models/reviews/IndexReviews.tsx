import { Link } from "react-router-dom";

export default function IndexReviews() {
  return (
    <div className="mt-4">
      <div
        className="card text-white bg-secondary mb-3"
        style={{ maxWidth: "50rem" }}
      >
        <div className="card-header">
          <h3>Reviews</h3>
        </div>
        <div className="card-body">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to="/reviews/create">Crear</Link>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to="/reviews/edit">Modificar</Link>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

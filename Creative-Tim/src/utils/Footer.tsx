import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/acerca-de" className="text-dark">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-dark">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-dark">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="text-dark">
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <p className="text-dark">Dirección: 123 Calle Falsa</p>
            <p className="text-dark">Teléfono: +598 12345678</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

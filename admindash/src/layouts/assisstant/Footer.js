import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-6 text-start">
            <p className="mb-0">
              <Link className="text-muted" to="#"><strong>DocMeIn</strong></Link> &copy;
            </p>
          </div>
          <div className="col-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link className="text-muted" to="https://adminkit.io/">Support</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="https://adminkit.io/">Help Center</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="https://adminkit.io/">Privacy</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-muted" to="https://adminkit.io/">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

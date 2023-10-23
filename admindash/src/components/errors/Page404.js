import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="error-404-container vh-100 d-flex align-items-center justify-content-center">
      <div className="error-404-content text-center">
        <div className="error-symbol">
          <i className="far fa-frown fa-7x text-danger"></i>
        </div>
        <h1 className="error-text font-weight-bold mt-4 display-4">404 Not Found</h1>
        <p className="mt-4">Oops! The page you are looking for could not be found.</p>
        <p className="mt-2">Please check the URL or contact the administrator for assistance.</p>
        <div className="back-to-home mt-4">
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error404;

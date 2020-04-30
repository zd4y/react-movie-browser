import React from 'react';

export default function Error({ message }) {
  return (
    <div className="error">
      <h3 className="error-heading">Sorry, an error occurred</h3>
      <p className="error-text">{message}</p>
    </div>
  );
}

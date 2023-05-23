import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage () {
  return (
    <div className='not-found'>
      <h1 className="not-found__title">Oops..</h1>
      <p>Page not found!</p>
      <button>
        <Link to='/experiments'>Back to Experiments</Link>
      </button>
    </div>
  )
}
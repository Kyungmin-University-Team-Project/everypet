import React from 'react';
import { Link } from 'react-router-dom';

const Productcategory = () => {
  return (
    <div>
      <Link to='/'>
        <button>Go to My Page 1</button>
      </Link>
      <Link to='/page2'>
        <button>Go to My Page 2</button>
      </Link>
      <Link to='/page3'>
        <button>Go to My Page 3</button>
      </Link>
    </div>
  );
};

export default Productcategory;

import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <button>Go to My Page 1</button>
            </Link>
            <Link to="/page2">
                <button>Go to My Page 2</button>
            </Link>
            <Link to="/page3">
                <button>Go to My Page 3</button>
            </Link>
            <Link to="/login">
                <button>Go to login page</button>
            </Link>
        </header>
    );
};

export default Header;
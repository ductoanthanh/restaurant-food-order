import React from 'react';
import PropTypes from 'prop-types';

// if a component just receive data from props and return JSX => stateless functional component
const Header = (props) => (
        <header className="top">
                <h1>Fish 
                    <span className="ofThe">
                    <span className="of">Of</span> 
                    <span className="the">The</span>
                    </span> 
                    Day</h1>
                <h3 className="tagline">
                    <span>{props.tagline}</span>
                </h3>
            </header>
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;
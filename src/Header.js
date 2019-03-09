import React, { Component } from 'react';
import { FaLightbulb } from 'react-icons/fa';

import './Header.css';

class Header extends Component {

    render() {
        return (
            <div className="Header ">
        
                <h3 className="text-head">Daily  <FaLightbulb className="icon"/></h3>
               
            </div>
        );
    }
}

export default Header;

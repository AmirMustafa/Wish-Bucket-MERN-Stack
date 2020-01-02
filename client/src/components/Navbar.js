import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  console.log(props);
  return (
    <nav>
      <div className="nav-wrapper" style={{ background: "#6200ee" }}>
        <a href="#" className="brand-logo right">
          Wish Bucket
        </a>
        <ul id="nav-mobile" className="left">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);

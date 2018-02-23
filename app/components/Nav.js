var React = require("react");
var Link = require("react-router-dom").Link;
var NavLink = require("react-router-dom").NavLink;

// won't have any state or lifecycle events - so stateless functional component
function Nav() {
  // component code
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/Popular">
          Popular
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = Nav;

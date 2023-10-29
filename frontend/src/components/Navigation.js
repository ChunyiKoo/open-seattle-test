import { NavLink } from "react-router-dom";

function Navigation() {
 return (
  <nav>
   <NavLink to="/">Home</NavLink>
   <NavLink to="/add-donation">
    {/*<NavLink exact to="/donations/new">*/}
    Add a donation
   </NavLink>
   <NavLink to="/inventory-report">Inventory Report</NavLink>
   <NavLink to="/donator-report">Donator Report</NavLink>
  </nav>
 );
}

export default Navigation;

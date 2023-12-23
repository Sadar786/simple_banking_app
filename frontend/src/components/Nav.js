import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const Navigate = useNavigate();
   const auth = localStorage.getItem('user');

  const logOut = () => {
    const auth = localStorage.clear();
    Navigate('/signUp')
  }

  return (
    <div className="nav">
      <img className='logo' src="https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg" alt="" />
      {
      auth ? <ul className="nav-ul">
<Link to="/signUp"style={{ color: 'blue', fontWeight: 'bolder' }} className="logOut">Spark Foundation</Link>
         <li><Link to="/" >Account List</Link></li>
         <li><Link to="/profile" >Profile</Link></li>
        <Link to="/signUp" onClick={()=>logOut()} className="logOut">Log Out</Link>
        <li className="name"><b>{JSON.parse(auth).name}</b></li>
         <li className="name"><b>{JSON.parse(auth).money}$</b></li>
      </ul>
      : <ul className="nav-ul">
         <><li><Link to="/login" >Login</Link></li>
                <li><Link to="/signup" >Sign Up</Link></li></>
                <Link to="/signUp"style={{ color: 'blue', fontWeight: 'bolder' }} className="logOut">Spark Foundation</Link>

      </ul>
      }
    </div>
  );
}

export default Nav;

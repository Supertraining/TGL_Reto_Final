import './navbar.css';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../login/Login';

const Navbar = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='homeLink'>
          <span className="logo">TOP GUN LAB HOTEL</span>
        </Link>
        { user ? user.username : <div className="navItems">
          <Login />
          <button className="navButton">Register</button>
        </div> }
      </div>
    </div>
  );
};

export default Navbar;

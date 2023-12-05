import './navbar.css';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../login/Login';

const Navbar = () => {

  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
  }

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='homeLink'>
          <span className="logo">TOP GUN LAB HOTEL</span>
        </Link>
        { user
          ? <div>
            { user.username }
            <button
              className='logout-btn'
              onClick={ () => handleLogout()}>
              Logout
            </button>
          </div>
          : <div className="navItems">
            <Login />
            <button className="navButton">Register</button>
          </div> }
      </div>
    </div>
  );
};

export default Navbar;

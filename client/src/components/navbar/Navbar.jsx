import './navbar.css';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../login/Login';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Navbar = () => {

  //const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  const [ credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined,
});

const { user, loading, error, dispatch } = useContext(AuthContext);

const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [ e.target.id ]: e.target.value }))
}

const handleClick = async () => {

    dispatch({ type: 'LOGIN_START' });
    try {
        const { data } = await axios.post('http://localhost:3000/api/user/login', credentials)
        const userData = jwtDecode(data);
        console.log(userData)
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData })

    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
    }
}

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='homeLink'>
          <span className="logo">TOP GUN LAB HOTEL</span>
          <img src='../../../public/Hotel2.png' className='img' alt="Top Gun Hotel logo"/>
        </Link>
        <div className='headerList'>
          <div className='headerListItem active'>
            <i className="bi bi-moon-fill"></i>
            <a href="https://www.trivago.com/" target="_blank" rel="noopener noreferrer" className='text'>Lodgings</a>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-airplane-fill"></i>
            <a href="https://www.google.com/travel/flights?hl=es" target="_blank" rel="noopener noreferrer" className='text'>Flights</a>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-car-front-fill"></i>
            <a href="https://www.localiza.com/" target="_blank" rel="noopener noreferrer" className='text'>Car rentals</a>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-backpack2-fill"></i>
            <a href="https://disneyworld.disney.go.com/" target="_blank" rel="noopener noreferrer" className='text'>Attractions</a>
          </div>
          <div className='headerListItem'>
          <i className="bi bi-taxi-front-fill"></i>
          <a href="https://aerotaxi.co/" target="_blank" rel="noopener noreferrer" className='text'>Airport taxis</a>
          </div>
        </div>
        {user
          ? <div>
            {user.username}
            <button
              className='logout-btn'
              onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
          :
          // <div className="navItems">
          //   <Login />
          //   <button className="navButton">Register</button>
          // </div>
          <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              Login
            </button>
            <form class="dropdown-menu p-4">
              <div class="mb-3">
                <label for="exampleDropdownFormEmail2" class="form-label">User name</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="username" onChange={ handleChange }/>
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword2" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password" onChange={ handleChange } />
              </div>
              <button disabled={ loading } class="btn btn-primary"onClick={ handleClick } type="submit" >Login</button>
            { error && <span>{ error.message }</span> }
            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;

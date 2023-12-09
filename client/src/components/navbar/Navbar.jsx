import './navbar.css';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import RegisterForm from './Register';

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
    console.log(credentials)
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('http://localhost:3000/api/user/login', credentials)
      const userData = jwtDecode(data);

      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...userData, token: data } })

    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
    }
  }

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const clickRegister = (e) =>{
    setIsModalOpen(true)
  }

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='homeLink'>
          <span className="logo">TOP GUN LAB HOTEL</span>
          <img src='../../../public/Hotel2.png' className='img' alt="Top Gun Hotel logo" />
        </Link>

        <div className='headerList'>
          <div id="links" className='headerListItem'>
            <i id="links" className="bi bi-moon-fill"></i>
            <a href="https://www.trivago.com/" target="_blank" rel="noopener noreferrer" className='text'>Lodgings</a>
          </div>

          <div className='headerList'>
            <div id="links" className='headerListItem'>
              <i id="links" className="bi bi-airplane-fill"></i>
              <a href="https://www.google.com/travel/flights?hl=es" target="_blank" id="links" rel="noopener noreferrer" className='text'>Flights</a>
            </div>
          </div>
          <div className='headerList'>
            <div id="links" className='headerListItem'>
              <i id="links" className="bi bi-car-front-fill"></i>
              <a href="https://www.localiza.com/" id="links" target="_blank" rel="noopener noreferrer" className='text'>Car rentals</a>
            </div>
          </div>
          <div className='headerList'>
            <div id="links" className='headerListItem'>
              <i className="bi bi-backpack2-fill"></i>
              <a href="https://disneyworld.disney.go.com/" id="links" target="_blank" rel="noopener noreferrer" className='text'>Attractions</a>
            </div>
          </div>
          <div className='headerList'>
            <div id="links" className='headerListItem'>
              <i id="links" className="bi bi-taxi-front-fill"></i>
              <a href="https://aerotaxi.co/" id="links" target="_blank" rel="noopener noreferrer" className='text'>Airport taxis</a>
            </div>
          </div>
        </div>

        {isModalOpen && (
        <RegisterForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      )}

        { user
          ? <div>
            { user.username }
            <button
              className='logout-btn'
              onClick={ () => handleLogout() }>
              Logout
            </button>
          </div>
          :
          // <div className="navItems">
          //   <Login />
          //   <button className="navButton">Register</button>
          // </div>
          <div className="btn-group dropstart">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
              Login
            </button>
            <form className="dropdown-menu p-1 col-3" >
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="email" className="form-control-lg" id="username" placeholder="username"
                  onChange={ handleChange } />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control-lg" id="password" placeholder="Password"
                  onChange={ handleChange } />
              </div>
          <div className='d-flex justify-content-center'>
                <button disabled={ loading } className="btn btn-primary" onClick={ handleClick } type="submit" >Login</button>
                { error && <span>{ error.message }</span> }
                <button className="btn btn-outline-dark " onClick={ clickRegister } type="button">Register</button>
              </div>

            </form>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;

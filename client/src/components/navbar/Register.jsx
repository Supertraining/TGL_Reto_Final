import './register.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types'

const RegisterForm = ({ setIsModalOpen }) => {

  const { dispatch } = useContext(AuthContext)

  const [ formData, setFormData ] = useState({
    fullname: undefined,
    username: undefined,
    password: undefined,
    //role: 'user', Pao aca no hace falta poner este campo, en el back lo hace por default
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [ e.target.name ]: e.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.password ||
      !formData.username
    ) {

      console.log({ msg: "One of the required fields is incorrect" });

      return;
    }

    try {

      const response = await axios.post('http://localhost:3000/api/user/register', formData);

      if (response) {
        console.log('LOGIN SUCCESSFUL!!')
        console.log(response.data)
      }

      dispatch({ type: 'LOGIN_START' });

      const credentials = { username: formData.username, password: formData.password }

      const { data } = await axios.post('http://localhost:3000/api/user/login', credentials)
      const userData = jwtDecode(data);

      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...userData, token: data } })

      setIsModalOpen(false)
      if (data) {
        console.log('YOU ARE LOGGED IN!!')
      }

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>Register</p>
        <form onSubmit={ handleSubmit } className='form'>
          <div className='inputsform'>
            <input
              className='fullname'
              type="text"
              name="fullname"
              placeholder="Fullname"
              onChange={ handleChange }
              value={ formData.fullname }
            />
            <input
              className='username'
              type="text"
              name="username"
              placeholder="Username"
              onChange={ handleChange }
              value={ formData.username }
            />
            <input
              className='password'
              type="text"
              name="password"
              placeholder="Password"
              onChange={ handleChange }
              value={ formData.password }
            />
          </div>
          <button type='submit'>Register</button>
          <button onClick={ () => setIsModalOpen(false) }>Close</button>
        </form>

      </div>
    </div>
  )

}

RegisterForm.propTypes = {
  setIsModalOpen: PropTypes.func,
}

export default RegisterForm;
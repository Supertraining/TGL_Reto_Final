import './register.css';
import axios from 'axios';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";

const RegisterForm = ({ setIsModalOpen, isModalOpen }) => {

  const [formData, setFormData] = useState({
    fullname: undefined,
    username: undefined,
    password: undefined,
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.password ||
      !formData.username
    ) {
      dispatch(
        setMessaggeError({ msg: "One of the required fields is incorrect" })
      );
      return;
    }
    dispatch({ type: 'REGISTER_START' });
    try {
      const { data } = await axios.post('http://localhost:3000/api/user/register', formData)
      const userData = jwtDecode(data);
      console.log(userData)
      dispatch({ type: 'REGISTER_SUCCESS', payload: formData })

    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data })
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>Register</p>
        <form onSubmit={handleSubmit} className='form'>
          <div className='inputsform'>
            <input
              className='fullname'
              type="text"
              name="fullname"
              placeholder="fullname"
              onChange={handleChange}
              value={formData.fullname}
            />
            <input
              className='username'
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              className='password'
              type="text"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Register</button>
      </div>
    </div>
  )

}

export default RegisterForm;
import axios from '../../utils/axiosInstance';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";

import './login.css'
const Login = () => {

    const [ credentials, setCredentials ] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [ e.target.id ]: e.target.value }))
    }

    const handleClick = async () => {

        dispatch({ type: 'LOGIN_START' });
        try {
            const { data } = await axios.post('/api/user/login', credentials)
            const userData = jwtDecode(data);
            console.log(userData)
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData })

        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
        }
    }

    return <div className='login'>

        <form className="lContainer">
            <input
                type="text"
                placeholder='username'
                id='username'
                onChange={ handleChange }
                className="lInput"
                autoComplete='on' />
            <input
                type="password"
                placeholder='password'
                id='password'
                onChange={ handleChange }
                className="lInput"
                autoComplete='on' />
            <button disabled={ loading } className="lButton" onClick={ handleClick }>Login</button>
            { error && <span>{ error.message }</span> }
        </form>

    </div>;
};

export default Login;

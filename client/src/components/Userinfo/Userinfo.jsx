import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './userinfo.css';
import axios from 'axios';

const Userinfo = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${user.id}`, {
                    headers: {
                        Authorization: user.token
                    }
                });

                const userDataObject = response.data;

                setUserData(userDataObject);
            } catch (error) {
                console.error('Error al obtener datos del usuario', error);
            }
        };

        fetchUserData();
    }, [user.id, user.token]);

    const fromDate = (dates) => {
        const startDate = dates?.length > 0
            && new Date(dates[0]).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            });
        return startDate;
    };

    const toDate = (dates) => {
        const endDate = dates && dates.length > 0
            && new Date(dates[dates.length - 1]).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        return endDate;
    };


    return (
        <div className='usercontainer'>
            <Link to="/" className='back'>
                {" "}
                <span>
                    Back
                </span>
            </Link>
            <div>
                <div>
                    <h1 className='welcome'>Welcome, {userData.fullname}</h1>
                </div>
                    <h2 className='text'> Your Reservations</h2>
                <div className='containerreservations'>

                    {userData && userData.myReservations.length > 0 ? (
                        // Si el usuario tiene reservas, muestra las reservas
                        userData.myReservations.map((reservation) => (
                            <div className='reservations' key={reservation.id}>
                                <p>Room Number: {reservation.roomNumber}</p>
                                <p>Dates reserved:</p>
                                <span>
                                    From {fromDate(reservation.reservationDates)} To {toDate(reservation.reservationDates)}
                                </span>
                            </div>
                        ))
                    ) : (
                        // Si el usuario no tiene reservas, muestra un mensaje y un enlace a la página principal
                        <div>
                            <p>No reservations found.</p>
                            <p>Visit <a href="/">Home</a> to make a reservation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Userinfo
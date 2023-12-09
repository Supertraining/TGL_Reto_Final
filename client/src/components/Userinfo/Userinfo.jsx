import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from 'react';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './userinfo.css';

const Userinfo = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    console.log(user)

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
            && new Date(dates[dates.length-1]).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        return endDate;
    };


    return (
        <div className='usercontainer'>
            <Link to="/">
                {" "}
                <span>
                    Back
                </span>
            </Link>
            <div>
                <div>
                    <h1 className='welcome'>Welcome, <span> {user.username}</span></h1>
                </div>
                <div className='containerreservations'>
                    <h2>Your Reservations</h2>
                    {user && user.myReservations.map((reservation) => (
                        <div className='reservations'>
                            <p>Room Number: {reservation.roomNumber}</p>
                            <p>Dates reserved:</p>
                            <span>
                                From
                                {fromDate(reservation.reservationDates)} To {toDate(reservation.reservationDates)}
                            </span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Userinfo
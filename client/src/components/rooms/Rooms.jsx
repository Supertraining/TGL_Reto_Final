import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './rooms.css'

const Rooms = () => {

  const { state } = useLocation()
  const { rooms, selectedDates } = state || {}

  const createReservation = async (roomNumber, roomId) => {

    const roomResponse = await axios.put('http://localhost:3000/api/room/reservation', { selectedDates: selectedDates, roomId: roomId });

    const userResponse = await axios.patch('http://localhost:3000/api/user/reservation/1', {
      reservationId: window.crypto.randomUUID(),
      roomNumber: roomNumber,
      reservationDates: selectedDates
    });

    // console.log(roomResponse)
    // console.log(userResponse)
  }

  const startDate = selectedDates?.length > 0
    && new Date(selectedDates[0]).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

  const endDate = selectedDates && selectedDates.length > 0
    && new Date(selectedDates[1]).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });


  return (
    <div className='ARooms'>
      <Link to="/">
        {" "}
        <span>
          Back
        </span>
      </Link>
      <h1>{rooms[0].type} Room</h1>
      <div className='container'>
        {rooms && rooms[0].type === 'Single' ? <img src="../../public/simple.jpeg" className='image' alt="..." />
          : rooms[0].type === 'Double' ? <img src="../../public/doble.jpeg" className='image' alt="..." />
            : <img src="../../public/quadruple.jpeg" className='image' alt="..." />
        }
        {rooms && rooms.map((room) => (
          <div className='reservation'>
            <div>
              <p >Room number: {room.roomNumber}</p>
              <p >{room.type}</p>
              <p >{room.description}</p>
            </div>
            <div className='price'>
              <p >Price: {room.price}</p>
              <p>Your selected dates:</p>
              <span>
                {`from ${startDate} to ${endDate}`}
              </span>
              <button onClick={() => createReservation(room.roomNumber, room._id)}>
                crear reservar
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Rooms
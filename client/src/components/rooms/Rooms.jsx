import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Rooms = () => {

  const { state } = useLocation()
  const { rooms, selectedDates } = state || {}

  const createReservation = async (roomNumber, roomId) => {

    const roomResponse = await axios.put('http://localhost:3000/api/room/reservation', { selectedDates: selectedDates, roomId: roomId });

    const userResponse = await axios.patch('http://localhost:3000/api/user/reservation/1', {
      reservationId: "xxdsdw12345",
      roomNumber: roomNumber,
      reservationDates: selectedDates
    });

    console.log(roomResponse)
    console.log(userResponse)

  }

  const startDate = selectedDates?.length > 0
    && new Date(selectedDates[ 0 ]).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

  const endDate = selectedDates && selectedDates.length > 0
    && new Date(selectedDates[ 2 ]).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });


  return (
    <div>

      <div style={ { marginLeft: '50%', marginTop: '20%' } }>

        { rooms && rooms.map((room) => (
          <div key={ window.crypto.randomUUID() }>
            <p >{ room.roomNumber }</p>
            <p >{ room.type }</p>
            <p >{ room.description }</p>
            <p >{ room.price }</p>
            <span>
              Your selected dates: { `from ${startDate} to ${endDate}` }</span>
            <button onClick={ () => createReservation(room.roomNumber, room._id) }>
              crear reservar
            </button>

          </div>

        )) }

      </div>

    </div>
  )
}

export default Rooms
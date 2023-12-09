import './mainRooms.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainRooms = () => {

  const navigate = useNavigate()

  const [ dates, setDates ] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const selectedDates = getDatesInRange(dates[ 0 ].startDate, dates[ 0 ].endDate);

  const availableRooms = async (type) => {
    
    try {

      if (selectedDates.length === 1) {
        setIsModalOpen(true);
        return;
      }
  
      const rooms = await axios.post('http://localhost:3000/api/room/availability', { selectedDates: selectedDates, type: type })

      rooms
        ? navigate('/available-rooms', { state: { rooms: rooms.data, selectedDates: selectedDates } })
        : rooms.data
  
      console.log(rooms.data);

    } catch (error) {
      console.log(error);
    }
  };

  let habitaciones = [
    {
      "img": "../../public/simple.jpeg",
      "type": "Single",
      "description": "One double bed available",
      "price": "USD 20",
    },
    {
      "img": "../../public/doble.jpeg",
      "type": "Double",
      "description": "Two single beds available",
      "price": "USD 35",
    },
    {
      "img": "../../public/quadruple.jpeg",
      "type": "Quadruple",
      "description": "Four single beds available",
      "price": "USD 50",
    },
  ]

  return (
    <div className='mainRooms-container'>

      <h1 className='titulo'>Our Rooms</h1>

      <div className='card-dates-container'>
        <h3>Select a date</h3>
        <DateRange
          editableDateInputs={ true }
          onChange={ (item) => setDates([ item.selection ]) }
          moveRangeOnFirstSelection={ false }
          ranges={ dates }
          className='date'
          minDate={ new Date() }
        />
      </div>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <p>Select minimum two days</p>
            <button onClick={() => setIsModalOpen(false)}>OK</button>
          </div>
        </div>
      )}

      <div className='card-container'>

        { habitaciones && habitaciones.map((habitacion) => (
          <div className='roomCard' style={{ display: 'flex', alignItems: 'center' }} key={ window.crypto.randomUUID() }>
           <div class="card mb-3" style={ { width: '50%' } }>
              <img src={ habitacion.img } class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{ habitacion.type }</h5>
                <p class="card-text">{ habitacion.description }</p>
                <p class="card-text"><small class="text-body-secondary">{ habitacion.price }</small></p>
              </div>
            </div>

            <div style={{ padding: '30px' }}>
              <button
                className='card-btn'
                style={{ height: '40px', border: 'none', background: '#0071c2', color: 'white', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
                onClick={ () => availableRooms(habitacion.type) }>
                Check Available Rooms
              </button>
            </div>

          </div>
        )) }
      </div>
    </div>
  )
}

export default MainRooms
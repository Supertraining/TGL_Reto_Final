import './mainRooms.css'
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

  const availableRooms = async () => {
    try {

      const rooms = await axios.post('http://localhost:3000/api/room/availability', { selectedDates: selectedDates })



      rooms
        ? navigate('/available-rooms', { state: {rooms: rooms.data, selectedDates: selectedDates} })
        : rooms.data
      
      console.log(rooms.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mainRooms-container'>

      <div className='card-container'>

        <div>

          <div className='card-img'>
            CARD IMAGE
          </div>
          <p className='card-tittle'>Card Title</p>
          <p className='card-description'>Card description</p>

        </div>

        <div className='card-dates-container'>
          <h3>Seleccione una fecha</h3>
          <DateRange
            editableDateInputs={ true }
            onChange={ (item) => setDates([ item.selection ]) }
            moveRangeOnFirstSelection={ false }
            ranges={ dates }
            className='date'
            minDate={ new Date() }
          />

          <button
            className='card-btn'
            onClick={ () => availableRooms() }>
            Available rooms
          </button>

        </div>

      </div>

      <div className='card-container'>
        DOUBLE ROOMS
        <div className='card-img'>
          CARD IMAGE
        </div>
        <p className='card-tittle'>Card Title</p>
        <p className='card-description'>Card description</p>
        <button className='card-btn'>
          DISPONIBILIDAD
        </button>
      </div>

      <div className='card-container'>
        QUADRUPLE ROOMS
        <div className='card-img'>
          CARD IMAGE
        </div>
        <p className='card-tittle'>Card Title</p>
        <p className='card-description'>Card description</p>
        <button className='card-btn'>
          DISPONIBILIDAD
        </button>
      </div>

    </div>
  )
}

export default MainRooms
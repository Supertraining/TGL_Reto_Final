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

  const [ noRoomsAvailable, setNoRoomsAvailable ] = useState(false);

  const availableRooms = async (type) => {

    try {

      if (selectedDates.length === 1) {
        setIsModalOpen(true);
        return;
      }

      const rooms = await axios.post('http://localhost:3000/api/room/availability', { selectedDates: selectedDates, type: type })

      if (rooms.data === null) {
        setNoRoomsAvailable(true);
        return;
      }

      navigate('/available-rooms', { state: { rooms: rooms.data, selectedDates: selectedDates } })

    } catch (error) {
      console.log(error);
    }
  };

  let habitaciones = [
    {
      "img": "../../public/simple.jpeg",
      "type": "Single",
      "description": "Welcome to our hotel room, where comfort meets simplicity. Neutral walls and soft lighting create a relaxing atmosphere. The queen-size bed is adorned with comfortable bedding, and bedside tables with lamps provide a cozy space. Enjoy the convenience of a desk, a television, and a clean bathroom with everything you need. Your temporary home awaits you with warmth and functionality. Welcome to your relaxing stay!",
      "price": "USD 20",
    },
    {
      "img": "../../public/doble.jpeg",
      "type": "Double",
      "description": "Welcome to our inviting room with two beds, where comfort and convenience blend seamlessly. The neutral walls and soothing lighting establish a calming ambiance. Both queen-size beds are adorned with cozy bedding, while bedside tables and lamps create a warm and comfortable setting. Whether you're traveling with a companion or need extra space for yourself, this room offers the perfect balance of relaxation and functionality. Enjoy the practicality of a desk, a television, and a well-equipped bathroom. Your temporary haven beckons you with a welcoming atmosphere. Welcome to a delightful stay for two!",
      "price": "USD 35",
    },
    {
      "img": "../../public/quadruple.jpeg",
      "type": "Quadruple",
      "description": "Step into our spacious room with four beds, a perfect retreat for group travelers or families. The neutral décor and gentle lighting set the tone for a serene atmosphere. The comfortable bedding on each bed ensures a restful night's sleep, and bedside tables with lamps provide a cozy touch. Whether you're traveling with family or friends, this room offers ample space and comfort for everyone. Take advantage of the convenience of a desk, multiple televisions, and a well-appointed bathroom with all the essentials. Your temporary sanctuary awaits, offering both warmth and practicality. Welcome to a relaxing stay for all!",
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
          onChange={ (item) => setDates([ item.selection ], setNoRoomsAvailable(false)) }
          moveRangeOnFirstSelection={ false }
          ranges={ dates }
          className='date'
          minDate={ new Date() }
        />
      </div>

      { isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <p>Select at least two dates</p>
            <button onClick={ () => setIsModalOpen(false) }>OK</button>
          </div>
        </div>
      ) }

      <div className='card-container'>

        { habitaciones && habitaciones.map((habitacion) => (
          <div className='roomCard' key={ window.crypto.randomUUID() }>
            <div className="card mb-3">
              <img src={ habitacion.img } className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ habitacion.type }</h5>
                <p className="card-text">{ habitacion.description }</p>
                <p className="card-text"><small className="text-body-secondary">{ habitacion.price }</small></p>
              </div>

              <div className='btn-rooms'>
                { noRoomsAvailable && <p className='errorRoom'>There´s no available rooms for this dates.</p> }
                <button
                  className='card-btn'
                  onClick={ () => availableRooms(habitacion.type) }
                  disabled={ noRoomsAvailable }>
                  Check Available Rooms
                </button>
              </div>
            </div>



          </div>
        )) }
      </div>
    </div>
  )
}

export default MainRooms
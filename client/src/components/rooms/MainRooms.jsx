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
      "description": "Explore Single Room Comfort: Discover a range of single rooms tailored to your preferences. From the intimate Single Deluxe Room with a jacuzzi to the spacious Single Family Suite with a kitchenette, each room offers a unique blend of comfort and style. Enjoy city views, premium amenities, and personalized service. Your ideal single room experience awaits!",
      "price": "Prices range from $90 to $170 per night",
    },
    {
      "img": "../../public/doble.jpeg",
      "type": "Double",
      "description": "Discover Luxury for Two:  Explore our curated collection of double rooms, each designed for the ultimate comfort of two guests. From the lavish Double Deluxe Room with a jacuzzi to the spacious Double Family Suite with a kitchenette, every room offers a unique blend of luxury and convenience. Indulge in panoramic city views, premium amenities, and personalized service. For an unforgettable experience designed just for you and your companion. Your ideal double room retreat awaits!",
      "price": "Prices range from $120 to $200 per night",
    },
    {
      "img": "../../public/quadruple.jpeg",
      "type": "Quadruple",
      "description": "Luxurious Quad Accommodations: Discover our exclusive collection of quad rooms, each meticulously crafted to provide unparalleled comfort for groups of four. From the opulent Quad Deluxe Room with panoramic city views to the spacious Quad Family Suite equipped with a kitchenette, each accommodation promises a unique blend of luxury and functionality. Immerse yourself in premium amenities, personalized service. Your perfect quad room getaway awaits!!",
      "price": "prices ranging from $180 to $280 per night"
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
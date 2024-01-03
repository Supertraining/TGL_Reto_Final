import './mainRooms.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState, useEffect } from 'react'
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MainRooms = () => {

useEffect(() => {
  getMainrooms()
}, [])

  const navigate = useNavigate()

  const [ dates, setDates ] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [mainRooms, setMainRooms] = useState([])

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

  const getMainrooms = async() => {
    try {
      const {data: mainRooms} = await axios.get('/api/mainRoom/');
      setMainRooms(mainRooms);
    } catch (error) {
      console.log(error)
    }
  }

  const availableRooms = async (type) => {

    try {

      if (selectedDates.length === 1) {
        setIsModalOpen(true);
        return;
      }

      const rooms = await axios.post('/api/room/availability', { selectedDates: selectedDates, type: type })

      if (rooms.data === null) {
        setNoRoomsAvailable(true);
        return;
      }

      navigate('/available-rooms', { state: { rooms: rooms.data, selectedDates: selectedDates } })

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mainRooms-container'>

      <h1 className='titulo'>Our Rooms</h1>

      <div className='card-dates-container'>
        <h3>Select the dates in which you wish to reserve a room and check it`s availability by clicking on the button under it.</h3>
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

        { mainRooms && mainRooms.map((room) => (
          <div className='roomCard' key={ window.crypto.randomUUID() }>
            <div className="card mb-3">
              <img src={ room.thumbnail } className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ room.type }</h5>
                <p className="card-text">{ room.description }</p>
                <p className="card-text"><small className="text-body-secondary">{ room.price }</small></p>
              </div>

              <div className='btn-rooms'>
                { noRoomsAvailable && <p className='errorRoom'>There´s no available rooms for this dates.</p> }
                <button
                  className='card-btn'
                  onClick={ () => availableRooms(room.type) }
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
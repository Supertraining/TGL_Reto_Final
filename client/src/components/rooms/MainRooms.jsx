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

  const availableRooms = async (type) => {

    try {

      const rooms = await axios.post('http://localhost:3000/api/room/availability', { selectedDates: selectedDates, type: type })

      rooms
        ? navigate('/available-rooms', { state: { rooms: rooms.data, selectedDates: selectedDates } })
        : rooms.data

      console.log(rooms.data)

    } catch (error) {
      console.log(error)
    }
  }

  let habitaciones = [
    {
      "img": "../../public/simple.jpeg",
      "type": "Single room",
      "description": "Habitacion Simple",
      "price": "USD 20",
    },
    {
      "img": "../../public/doble.jpeg",
      "type": "Double room",
      "description": "Habitacion doble",
      "price": "USD 35",
    },
    {
      "img": "../../public/quadruple.jpeg",
      "type": "Quadruple roon",
      "description": "Habitacion cuadruple",
      "price": "USD 50",
    },
  ]



  return (
    <div className='mainRooms-container'>

      <h1 className='titulo'>Nuestras habitaciones</h1>

      <div id="carouselExampleCaptions" class="carousel slide" style={ { padding: '10%' } }>
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">

          { habitaciones && habitaciones.map((habitacion) => (
            <div class="carousel-item active">
              <img src={ habitacion.img } class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>{ habitacion.type }</h5>
                <p>{ habitacion.description }</p>
                <p>{ habitacion.price }</p>
              </div>
            </div>
          )) }
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className='card-container'>

        { habitaciones && habitaciones.map((habitacion) => (
          <div className='roomCard' key={ window.crypto.randomUUID() }>
            <div class="card mb-3" style={ { width: '100%' } }>
              <img src={ habitacion.img } class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{ habitacion.type }</h5>
                <p class="card-text">{ habitacion.description }</p>
                <p class="card-text"><small class="text-body-secondary">{ habitacion.price }</small></p>
              </div>
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
                onClick={ () => availableRooms(habitacion.type) }>
                Available rooms
              </button>
            </div>
          </div>



        )) }
      </div>



    </div>
  )
}

export default MainRooms
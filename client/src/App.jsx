import { useState } from 'react'
import './App.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import axios from 'axios';

function App() {

  const [ dates, setDates ] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [ showDates, setShowDates ] = useState(false)

  console.log('DATES:', dates)

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
  console.log('ALLDATES:', selectedDates)

  // const getRooms = async () => {
  //   try {

  //     const dbRooms = await axios.get('http://localhost:3000/api/room');

  //     console.log('ROOMS:', dbRooms.data)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const availableRooms = async () => {
    try {

      const rooms = await axios.post('http://localhost:3000/api/room/availableRooms', { selectedDates: selectedDates })

      console.log(rooms.data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div style={ { marginLeft: '50%', marginTop: '20%' } }>
      
      <div>
        <div>
           IMAGE
        </div>
       

        <button onClick={()=> setShowDates(!showDates)}>
         SINGLE ROOM 
        </button> 

      </div>

      { showDates &&
        <>
        <div>
          <h3>Seleccione una fecha</h3>
            <DateRange
              editableDateInputs={ true }
              onChange={ (item) => setDates([ item.selection ]) }
              moveRangeOnFirstSelection={ false }
              ranges={ dates }
              className='date'
              minDate={ new Date() }
            />
          </div>

          <div>
            <span>{ `${format(
              dates[ 0 ].startDate,
              'MM/dd/yyyy'
            )} to ${format(dates[ 0 ].endDate, 'MM/dd/yyyy')}` }
            </span>
          </div>


          <button onClick={ () => availableRooms() }>
            Habitaciones disponibles
          </button>
        </>
      }


    </div>
  )
}

export default App

import MainRooms from '../components/rooms/MainRooms'
import Rooms from '../components/rooms/Rooms'
import './home.css'

// import Footer from '../../components/footer/Footer'


const Home = () => {

  return (
    <div>

      <div className="homeContainer">

        <MainRooms/>

        <Rooms />
      
      </div>

    </div>
  )
}

export default Home
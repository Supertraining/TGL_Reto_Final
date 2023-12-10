import MainRooms from '../components/rooms/MainRooms'
import './home.css'
import Header from '../components/header/Header'

// import Footer from '../../components/footer/Footer'


const Home = () => {

  return (
    <div>

      <div className="homeContainer">
        <Header/>
        <MainRooms/>
      </div>

    </div>
  )
}

export default Home
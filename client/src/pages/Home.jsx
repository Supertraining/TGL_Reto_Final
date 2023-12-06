import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import Rooms from '../components/rooms/Rooms'
import './home.css'

// import Footer from '../../components/footer/Footer'


const Home = () => {

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">


        <div className='card-container' style={ { border: '1px solid black', borderRadius: '5px', height: '500px', width: '350px' } }>
          SINGLE ROOMS
          <div className='card-img'>

          </div>
          <p className='card-tittle'>Card Title</p>
          <p className='card-description'>Card description</p>
          <button className='card-btn'>
            DISPONIBILIDAD
          </button>
        </div>

        DOUBLE ROOMS
        QUADRUPLE ROOMS

        <Rooms />

        {/* <Footer /> */ }
      </div>
    </div>
  )
}

export default Home
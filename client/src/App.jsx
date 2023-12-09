import './App.css'
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Rooms from './components/rooms/Rooms';
import Userinfo from './components/Userinfo/Userinfo';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/available-rooms' element={ <Rooms /> } />
          <Route path='/user-info' element={ <Userinfo /> } />
        </Routes>
        {/* <Footer /> */ }
      </BrowserRouter>
    </>
  )
}

export default App

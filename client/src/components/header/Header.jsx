import './header.css';

const Header = () => {

  return (
    <div className='header'>
      <div className='headerContainer'>
        <div className='headerList'>
          <div className='headerListItem active'>
            <i className="bi bi-moon-fill"></i>
            <span className='text'>Stays</span>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-airplane-fill"></i>
            <span className='text'>Flights</span>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-car-front-fill"></i>
            <span className='text'>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <i className="bi bi-backpack2-fill"></i>
            <span className='text'>Attractions</span>
          </div>
          <div className='headerListItem'>
          <i className="bi bi-taxi-front-fill"></i>
            <span className='text'>Airport taxis</span>
          </div>
        </div>

        <>

          <h1 className='headerTitle'>A lifetime of discounts? It´s Genius.</h1>
          <p className='headerDesc'>
            Get rewarded for your travels – unlock instant savings of 10% or more
            with a free Top Gun Lab account
          </p>

        </>

      </div>
    </div>
  );
};

export default Header;



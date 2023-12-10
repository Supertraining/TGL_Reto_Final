import './header.css';

const Header = () => {

  return (
    <div className='header'>
      <div className='headerContainer'>
        
        <div className='headerSubContainer'>
          <h1 className='headerTitle'>A lifetime of discounts? It´s Genius.</h1>
          <p className='headerDesc'>
            Get rewarded for your travels – unlock instant savings of 10% or more
            with a free Top Gun Lab account
          </p>
        </div>
        <img src='../../../public/House.png' className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
    </div>
  );
};

export default Header;



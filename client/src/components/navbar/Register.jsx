import './register.css';

const RegisterForm = ()=> {

    return(
        <div className='modal-overlay'>
          <div className='modal-content'>
            <p>Select minimum two days</p>
            <button onClick={() => setIsModalOpen(false)}>OK</button>
          </div>
        </div>
    )

}

export default RegisterForm;
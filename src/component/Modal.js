import React, { useState } from 'react'

const Modal = (props) => {
  const [isActive, setIsActive] = useState(false)

  const changeModalState = () => setIsActive(!isActive)

  const { openButtonText, children, onModalSubmit } = props

  return (
    <div>
      <button
        onClick={changeModalState}
        type='button'
        className='button is-medium is-info is-outlined'
        data-toggle='modal'
        data-target='#exampleModal'
      >
        {openButtonText || 'Open'}
      </button>
      <div className={`modal ${isActive && 'is-active'}`}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Make a Deal</p>
            <button
              onClick={changeModalState}
              className='delete'
              aria-label='close'
            ></button>
          </header>
          <section className='modal-card-body'>{children}</section>
          <footer className='modal-card-foot'>
            <button
              onClick={() => onModalSubmit(changeModalState())}
              className='button is-success'
            >
              Save changes
            </button>
            <button onClick={changeModalState} className='button'>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Modal

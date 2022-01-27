import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay,ModalContainer } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose,image}){
 
   
useEffect(()=>{
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
   
  window.addEventListener('keydown', handleKeyDown);
  return ()=>{ window.removeEventListener('keydown', handleKeyDown);}
 

  

},[onClose]);


  const handleBackdropClick = event => {
  
    if (event.currentTarget === event.target) {
    onClose();
    }
  };

    return createPortal(
      
      <Overlay onClick={handleBackdropClick}>
      <ModalContainer  >
        <img src={image} alt="" />
      </ModalContainer>
    </Overlay>,
      modalRoot,
    );
  }

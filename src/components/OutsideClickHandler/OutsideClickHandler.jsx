import {useRef, useState, useEffect, useCallback} from "react";

const OutsideClickHandler = ({children, onOutsideClick, className}) => {

  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target)
    ) {
      onOutsideClick();
    }
  }, [onOutsideClick])

  useEffect(() => {
    if(wrapperRef.current) {
      document.addEventListener('click', handleClickOutside);
    } 
    return(()=>{
      document.removeEventListener('click', handleClickOutside)
    })
  }, [handleClickOutside])

  return(
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  )
}

export default OutsideClickHandler;
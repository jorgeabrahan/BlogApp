import React, { useEffect, useRef } from "react"
import { XmarkIcon } from "../icons"

export const ModalLayout = ({ isOpen = false, setIsOpen = () => {}, children }) => {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal()
      return
    }
    dialogRef.current.close()
  }, [isOpen])
  return (
    <dialog className='modal-layout' ref={dialogRef}>
      <button className='modal-layout__action--close' onClick={() => setIsOpen(false)}>
        <XmarkIcon size='28px' />
      </button>
      {children}
    </dialog>
  );
}

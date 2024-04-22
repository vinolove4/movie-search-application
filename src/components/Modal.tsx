import React, { useEffect, useRef, useState } from "react"

interface ModalProps {
    isOpen: boolean;
    onClose: ()=> any;
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    useEffect(()=>{
        setIsModalOpen(isOpen)
    }, [isOpen])

    const closeModalHandler = () => {
        setIsModalOpen(false)
        onClose?.();
    }
    
    const escapeKeyHandler = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if(event.key === "Escape"){
            closeModalHandler()
        }
    }

    useEffect(()=>{
        const modalElement = modalRef.current;
        const body = document.body;
        if(isModalOpen){
            modalElement?.showModal?.();
            body.style.overflow = "hidden"
        }else{
            modalElement?.close?.();
            onClose?.()
        }

        return()=>{
            body.style.overflow = "auto"
        }
    }, [isModalOpen])

    return(
        <dialog ref={modalRef} className={`custom-modal`} onKeyDown={escapeKeyHandler} data-testid="custom-modal">
            <div className="dialog-header">
                <img src="close.svg" onClick={closeModalHandler} data-testid="close-model-icon" />
            </div>
            <div className="dialog-body">
                {
                    children
                }
            </div>
        </dialog>
    )
}
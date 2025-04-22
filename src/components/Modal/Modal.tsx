import React, { useEffect } from "react";

// Define types for props
type ModalProps = {
    modalText : string
  modalVisible: boolean; // Single callback to toggle the modal
  setModalVisible: (visible: boolean) => void; // Function to set modal visibility
};

export default function Modal({ modalVisible, setModalVisible, modalText }: ModalProps) {
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // auto close after 2.5 sec
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [modalVisible, setModalVisible]);

  return modalVisible ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0  bg-opacity-30 backdrop-blur-md"
        onClick={toggleModal} 
      ></div>
      <div
        className="w-[200px] h-[80px] bg-white rounded shadow-lg flex items-center justify-center relative z-10"
        onClick={toggleModal} 
      >
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={toggleModal}
        >
          ✖
        </button>
        <p className="text-center text-black">{modalText}</p>
      </div>
    </div>
  ) : null;
}
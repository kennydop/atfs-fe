import { useEffect } from "react";

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

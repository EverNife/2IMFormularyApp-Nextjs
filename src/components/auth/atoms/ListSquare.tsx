import {useState} from "react";

export default function ListSquare() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={`fixed bottom-5 md:bottom-10 right-4 md:bottom-4 rounded-md flex flex-col items-center bg-gray-200 shadow-lg`}>
          <button className="absolute top-0 right-0 p-2 text-2xl lg:text-4xl text-red-700" onClick={handleClose}>
            X
          </button>
          <a href="listar" className="text-1x1 pt-6 md:pt-0 md:text-6xl md:m-5">
            👥
          </a>
          <a href="listar" className="text-sm mt-2 mb-1">
            Listar Todos
          </a>
        </div>
      )}
    </>
  );
}
import React, { useState } from "react";
import OffersSection from "../productos"; // Cambia "../productos" por la ruta correcta de tu componente

const HomePage = () => {
  // Lista de imágenes para el carrusel
  const images = [
    "https://m.media-amazon.com/images/I/61H85W+xslL._SX1500_.jpg",
    "https://m.media-amazon.com/images/I/81SV-8WwbTL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/81j48l4125L._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/81j48l4125L._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/8160mcgKQyL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/8136JXdFrcL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/81ergv5sc8L._SX3000_.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir a la siguiente imagen
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir a la imagen anterior
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-100 relative top-20">
      {/* Carrusel */}
      <div className="relative w-full mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            className="w-full h-auto"
          />
        </div>

        {/* Botones de navegación */}
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 z-20"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 z-20"
        >
          &#8250;
        </button>
      </div>

      {/* Sección de productos superpuesta */}
      <div className="absolute top-56 left-0 w-full px-4 z-10">
        <OffersSection />
      </div>
    </div>
  );
};

export default HomePage;

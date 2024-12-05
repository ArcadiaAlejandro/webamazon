import React, { useRef } from "react";

const ProductCarousel = () => {
  // Especificamos el tipo del ref como HTMLDivElement
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const products = [
    {
      img: "https://via.placeholder.com/150",
      name: "Little Live Pets My Really Real Pup",
      price: "US$37.49",
      originalPrice: "US$49.99",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "Melissa & Doug Flip pescado suave",
      price: "US$12.24",
      originalPrice: "US$24.99",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "Pickleball Blast - El juego Pickle",
      price: "US$7.49",
      originalPrice: "US$14.99",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "The Forest Feast • Rompecabezas",
      price: "US$11.49",
      originalPrice: "US$22.99",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "Stellar Blade - PlayStation 5",
      price: "US$49.97",
      originalPrice: "US$69.99",
    },
    {
      img: "https://via.placeholder.com/150",
      name: "SKIBIDI Toilet Inodoro mis",
      price: "US$35.00",
      originalPrice: "US$59.99",
    },
  ];

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-orange-500 py-6 px-4 rounded-md top-44">
      <h2 className="text-white text-lg font-bold mb-4">
        Precios imperdibles de Cyber Monday
      </h2>

      {/* Botón Izquierdo */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 z-20"
      >
        &#8249; {/* Icono de flecha izquierda */}
      </button>

      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="flex items-center space-x-6 overflow-x-scroll scrollbar-hide"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-4 min-w-[250px] max-w-[250px] text-center"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-red-600">{product.price}</p>
            <p className="text-sm text-gray-500 line-through">
              {product.originalPrice}
            </p>
          </div>
        ))}
      </div>

      {/* Botón Derecho */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 z-20"
      >
        &#8250; {/* Icono de flecha derecha */}
      </button>
    </div>
  );
};

export default ProductCarousel;

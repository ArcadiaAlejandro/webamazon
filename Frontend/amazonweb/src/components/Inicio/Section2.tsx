import React, { useRef } from "react";

const HorizontalCarousel = () => {
  // Referencia del carrusel
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const items = [
    { img: "https://via.placeholder.com/80", label: "Todas las ofertas" },
    { img: "https://via.placeholder.com/80", label: "Dispositivos Amazon" },
    { img: "https://via.placeholder.com/80", label: "Pequeñas empresas" },
    { img: "https://via.placeholder.com/80", label: "Festivos" },
    { img: "https://via.placeholder.com/80", label: "Favoritos de los clientes" },
    { img: "https://via.placeholder.com/80", label: "PC y Juegos" },
    { img: "https://via.placeholder.com/80", label: "Juegos" },
    { img: "https://via.placeholder.com/80", label: "Todas las ofertas" },
    { img: "https://via.placeholder.com/80", label: "Dispositivos Amazon" },
    { img: "https://via.placeholder.com/80", label: "Pequeñas empresas" },
    { img: "https://via.placeholder.com/80", label: "Festivos" },
    { img: "https://via.placeholder.com/80", label: "Favoritos de los clientes" },
    { img: "https://via.placeholder.com/80", label: "PC y Juegos" },
    { img: "https://via.placeholder.com/80", label: "Juegos" },
  ];

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full bg-gray-100 py-4 top-32 items-center">
      <h2 className=" text-black text-lg font-bold mb-4 px-4">
        Hasta 40% en Cyber Monday{" "}
        <a href="#" className="text-blue-500 underline">
          Explora más ofertas
        </a>
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
        className="flex items-center space-x-6 overflow-x-scroll scrollbar-hide px-4"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[120px]"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center">
              <img
                src={item.img}
                alt={item.label}
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2 text-center">
              {item.label}
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

export default HorizontalCarousel;

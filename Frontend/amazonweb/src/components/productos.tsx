import React from "react";

const OffersSection = () => {
  const categories = [
    {
      title: "Dispositivos Amazon en oferta",
      link: "Ver más",
      products: [
        { img: "https://via.placeholder.com/100", discount: "-60%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-54%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-45%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-56%", label: "Oferta Cyber Monday" },
      ],
    },
    {
      title: "Ofertas en hallazgos favoritos",
      link: "Compra las ofertas favoritas",
      products: [
        { img: "https://via.placeholder.com/100", discount: "-54%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-50%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-17%", label: "Oferta Cyber Monday" },
        { img: "https://via.placeholder.com/100", discount: "-43%", label: "Oferta Cyber Monday" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <div key={index} className="bg-slate-100 bg-opacity-50 rounded-lg shadow-lg p-4 text-center">
          <h3 className="text-black text-lg font-bold mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 gap-4 items-center justify-center">
            {category.products.map((product, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center">
                <img src={product.img} alt={product.label} className="w-20 h-20 mb-2" />
                <span className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded-md">
                  {product.discount}
                </span>
                <p className="text-red-600 text-sm mt-1">{product.label}</p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="text-blue-900 hover:text-red-600 text-sm mt-4 inline-block font-medium text-left"
          >
            {category.link}
          </a>
        </div>
      ))}
    </div>
  );
};

export default OffersSection;

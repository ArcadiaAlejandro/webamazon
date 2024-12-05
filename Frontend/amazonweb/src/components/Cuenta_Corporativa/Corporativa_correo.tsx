import React, { useState } from "react";
import { Link } from "react-router-dom";

const AmazonBusiness = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Validar si el correo contiene "@"
    if (!inputValue.includes("@") || inputValue.trim() === "") {
      setError("Por favor, ingresa un correo electrónico válido.");
    } else {
      setError(""); // Limpiar el error si el correo es válido
    }
  };

  const handleSubmit = (e) => {
    if (error || email.trim() === "") {
      e.preventDefault(); // Evitar que pase al siguiente paso
      setError("Por favor, ingresa un correo electrónico válido.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-black">
      {/* Header */}
      <header className="w-full bg-blue-900 text-white p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="data:image/png;base64,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"
            alt="Amazon Business Logo"
            className="h-6 mr-4"
          />
        </div>

        {/* Steps */}
        <nav className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-900 font-bold">
              1
            </span>
            <span className="text-sm font-medium">CREACIÓN DE CUENTA</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white text-white font-bold">
              2
            </span>
            <span className="text-sm">DETALLES DEL NEGOCIO</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white text-white font-bold">
              3
            </span>
            <span className="text-sm">FINALIZAR</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row bg-white shadow-md max-w-6xl w-full mt-10 rounded-lg">
        {/* Left Section */}
        <div className="p-6 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Vamos a crear tu cuenta gratis de Amazon Business
          </h2>
          <p className="mb-4 text-gray-700">
            Ingresa el correo electrónico que quieres usar para tu cuenta
            corporativa
          </p>
          <input
            type="email"
            placeholder="Ingresar correo electrónico"
            value={email}
            onChange={handleChange}
            className={`w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-500 border-red-500" : "focus:ring-orange-500"
            } bg-white`}
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <Link
            to={{
              pathname: "/corporativo/negocio",
              state: { email },
            }}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded block text-center ${
              error || email.trim() === "" ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={handleSubmit}
          >
            Primeros pasos
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            ¿Ya eres cliente de Amazon Business?{" "}
            <Link to="#" className="text-blue-600 hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-blue-900 text-white p-6 lg:w-1/2">
          <h3 className="text-lg font-bold mb-4">
            Valor agregado para todo tipo de organización
          </h3>
          <ul className="space-y-4">
            <li>
              <h4 className="font-bold">Compre más, ahorre más</h4>
              <p className="text-sm">
                Del comercio a la educación, ahorre en más de 60 millones de
                productos al comprar en cantidades superiores a dos.
              </p>
            </li>
            <li>
              <h4 className="font-bold">Conectar a las personas</h4>
              <p className="text-sm">
                Cree grupos, comparta métodos de pago y administre suministros
                en todas las ubicaciones.
              </p>
            </li>
            <li>
              <h4 className="font-bold">
                Obtenga envío rápido, GRATIS con Business Prime
              </h4>
              <p className="text-sm">
                Solo una membresía Business Prime cubre el envío gratis
                ilimitado en pedidos elegibles para toda la organización.
              </p>
            </li>
          </ul>
          <a
            href="#"
            className="block mt-4 text-sm text-blue-300 hover:underline"
          >
            Más información acerca de Amazon Business
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-500">
        <p>
          ¿Necesitas ayuda? Contacta a{" "}
          <a href="#" className="text-blue-600 hover:underline">
            servicio al cliente empresarial
          </a>
          . Lee nuestras{" "}
          <a href="#" className="text-blue-600 hover:underline">
            condiciones de uso
          </a>{" "}
          y{" "}
          <a href="#" className="text-blue-600 hover:underline">
            aviso de privacidad
          </a>
          .
        </p>
        <p className="mt-2">&copy; 1996-2024, Amazon.com Inc. o sus filiales</p>
      </footer>
    </div>
  );
};

export default AmazonBusiness;

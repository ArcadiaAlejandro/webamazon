import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BusinessDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibe los datos desde la página anterior
  const formDataFromPreviousPage = location.state || {};

  const [formData, setFormData] = useState({
    ...formDataFromPreviousPage,
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError(""); // Limpia el error al escribir
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar contraseñas seguras
    const passwordPolicy =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
    if (!passwordPolicy.test(formData.password)) {
      setError(
        "La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Redirigir a la página "Finalizar" con todos los datos
    console.log("Datos enviados:", formData);
    navigate("/finalizar", { state: { ...formData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="data:image/png;base64,iVBORw..."
            alt="Amazon Business Logo"
            className="h-6 mr-4"
          />
        </div>

        {/* Steps */}
        <nav className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white text-white font-bold">
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
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-900 font-bold">
              3
            </span>
            <span className="text-sm">FINALIZAR</span>
          </div>
        </nav>
      </header>

      {/* Contenedor Principal */}
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full mt-10 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Detalles del Negocio</h1>
        <p className="mb-4 text-sm text-gray-600">
          Confirma los detalles de tu negocio antes de continuar.
        </p>

        {/* Detalles mostrados */}
        <div className="mb-4">
          <p><strong>RUC de la Empresa:</strong> {formData.ruc}</p>
          <p><strong>Nombre de la Empresa:</strong> {formData.companyName}</p>
          <p><strong>Sector:</strong> {formData.sector}</p>
          <p><strong>Ubicación:</strong> {formData.location}</p>
          <p><strong>Cantidad de Empleados:</strong> {formData.employees}</p>
          <p>
            <strong>Inicio de Actividades Comerciales:</strong>{" "}
            {formData.startDate}
          </p>
          <p><strong>Correo Corporativo:</strong> {formData.corporateEmail}</p>
        </div>

        {/* Formulario de contraseñas */}
        <form onSubmit={handleSubmit}>
          {/* Contraseña */}
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una contraseña"
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;

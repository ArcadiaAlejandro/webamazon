import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BusinessDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibe el correo desde la página anterior
  const emailFromPreviousPage = location.state?.email || ""; // Asegura que no sea undefined

  const [formData, setFormData] = useState({
    ruc: "",
    companyName: "",
    sector: "",
    location: "",
    employees: "",
    startDate: "",
    corporateEmail: "", // Se llenará en el handleSubmit
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError(""); // Limpia el error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si todos los campos están llenos
    for (const field in formData) {
      if (formData[field].trim() === "") {
        setError("Todos los campos son obligatorios.");
        return;
      }
    }

    // Validar si el RUC comienza con 10 o 20
    if (!/^10|^20/.test(formData.ruc)) {
      setError(
        "El RUC debe comenzar con 10 o 20. Si no tienes un RUC válido, crea una cuenta como persona natural."
      );
      return;
    }

    // Completar el correo corporativo con el valor por defecto si no fue modificado
    if (!formData.corporateEmail.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        corporateEmail: emailFromPreviousPage,
      }));
    }

    // Mostrar datos en la consola antes de enviar
    console.log("Datos enviados:", formData);

    // Navegar a la siguiente página con los datos
    navigate("/corporativo/negocio/envio", { state: { ...formData } });
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-900 text-white p-4 flex justify-between items-center">
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
            <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white text-white font-bold">
              1
            </span>
            <span className="text-sm font-medium">CREACIÓN DE CUENTA</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-900 font-bold">
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

      {/* Contenedor Principal */}
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full mt-10 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Detalles del Negocio</h1>
        <p className="mb-4 text-sm text-gray-600">
          Completa la información de tu empresa para continuar con la creación
          de tu cuenta.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* RUC */}
          <label htmlFor="ruc" className="block text-sm font-medium mb-2">
            RUC de la Empresa
          </label>
          <input
            type="text"
            id="ruc"
            value={formData.ruc}
            onChange={handleChange}
            placeholder="Ingrese el RUC (debe comenzar con 10 o 20)"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Nombre de la Empresa */}
          <label
            htmlFor="companyName"
            className="block text-sm font-medium mb-2"
          >
            Nombre de la Empresa
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Ingrese el nombre de la empresa"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Sector */}
          <label htmlFor="sector" className="block text-sm font-medium mb-2">
            Sector
          </label>
          <input
            type="text"
            id="sector"
            value={formData.sector}
            onChange={handleChange}
            placeholder="Ingrese el sector de la empresa"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Ubicación */}
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ingrese la ubicación de la empresa"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Cantidad de empleados */}
          <label htmlFor="employees" className="block text-sm font-medium mb-2">
            Cantidad de Empleados
          </label>
          <input
            type="number"
            id="employees"
            value={formData.employees}
            onChange={handleChange}
            placeholder="Ingrese el número de empleados"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Inicio de actividades comerciales */}
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Inicio de Actividades Comerciales
          </label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {/* Correo corporativo */}
          <label
            htmlFor="corporateEmail"
            className="block text-sm font-medium mb-2"
          >
            Correo Corporativo
          </label>
          <input
            type="email"
            id="corporateEmail"
            defaultValue={emailFromPreviousPage} // Usa defaultValue para establecer el valor por defecto
            onChange={handleChange}
            placeholder="Ingrese el correo corporativo"
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
          >
            <Link to="/corporativo/negocio/envio">Continuar</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Nuevo estado para manejar el mensaje de éxito
  const navigate = useNavigate();

  // Validar si es correo o celular
  const isEmail = (input) => input.includes("@");
  const isPhone = (input) => /^[0-9]{9,15}$/.test(input); // Solo dígitos entre 9 y 15 caracteres

  const handleChange = (e) => {
    const input = e.target.value;
    setIdentifier(input);

    if (input.trim() === "") {
      setError("Por favor, ingresa un correo electrónico o celular válido.");
      setSuccess("");
    } else if (!isEmail(input) && !isPhone(input)) {
      setError("Formato inválido. Usa un correo con '@' o un celular numérico.");
      setSuccess("");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmail(identifier) && !isPhone(identifier)) {
      setError("Por favor, ingresa un correo electrónico o celular válido.");
      return;
    }

    try {
      // Consumir la API para verificar el identificador
      const response = await fetch(
        `http://localhost:3000/usuarios/check-identifier?identifier=${identifier}`
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud a la API");
      }

      const data = await response.json();

      if (data.exists) {
        setError("");
        setSuccess("Identificador válido."); // Mostrar mensaje de éxito
        localStorage.setItem("userIdentifier", identifier); // Guardar el identificador (correo o celular) en localStorage
        setTimeout(() => {
          navigate("/login/contraseña"); // Redirigir a la página de contraseña
        }, 1000);
      } else {
        setError("El identificador no está registrado. Por favor regístrate.");
        setSuccess("");
      }
    } catch (error) {
      setError("Hubo un problema al verificar el identificador. Inténtalo de nuevo.");
      setSuccess("");
      console.error("Error al verificar el identificador:", error.message, error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mt-10 mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="w-36"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-semibold mb-4 text-gray-500 align-middle">Iniciar sesión</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>} {/* Mensaje de éxito */}

        <form onSubmit={handleSubmit}>
          {/* Email or Phone Input */}
          <label htmlFor="identifier" className="block text-sm font-medium mb-1 text-black">
            E-mail o celular
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 bg-white text-gray-500 focus:ring-yellow-200"
            placeholder="Introduce tu correo o celular"
          />

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded"
          >
            Continuar
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-600 mt-4">
          Al continuar, aceptas las{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Condiciones de uso
          </a>{" "}
          y el{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Aviso de privacidad
          </a>{" "}
          de Amazon.
        </p>

        {/* Help */}
        <div className="mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            ¿Necesitas ayuda?
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          ¿Eres nuevo en Amazon?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline font-medium">
            Crea tu cuenta de Amazon
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

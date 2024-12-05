import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Password = () => {
  const [identifier, setIdentifier] = useState(""); // Puede ser correo o celular
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el identificador (correo o celular) desde localStorage
    const storedIdentifier = localStorage.getItem("userIdentifier");
    if (storedIdentifier) {
      setIdentifier(storedIdentifier);
    } else {
      // Si no hay identificador, redirigir al login
      navigate("/login");
    }
  }, [navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setError("El acceso está bloqueado temporalmente. Inténtalo más tarde.");
      return;
    }

    if (password.trim().length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      // Consumir la API para validar la contraseña
      const response = await fetch("http://localhost:3000/usuarios/validate-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud a la API");
      }

      const data = await response.json();

      if (data.valid) {
        setError("");
        setSuccess("¡Acceso correcto!");
        setAttempts(0); // Reiniciar intentos fallidos
        setTimeout(() => {
          navigate("/"); // Redirigir a la página principal
        }, 2000);
      } else {
        setAttempts((prev) => prev + 1);
        setError("La contraseña es incorrecta.");
        setSuccess("");

        if (attempts + 1 >= 3) {
          setIsLocked(true);
          setError("Has alcanzado el límite de intentos. Inténtalo de nuevo en 30 segundos.");
          setTimeout(() => {
            setIsLocked(false);
            setAttempts(0);
            setError("");
          }, 30000); // 30 segundos de bloqueo
        }
      }
    } catch (error) {
      setError("Hubo un problema al validar la contraseña. Inténtalo de nuevo.");
      setSuccess("");
      console.error("Error al validar la contraseña:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-black">
      {/* Logo */}
      <div className="mt-10 mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="w-36"
        />
      </div>

      {/* Password Form */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-semibold mb-4 text-gray-500 align-middle">
          Configura tu contraseña
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Identifier Label */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">Identificador</label>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{identifier}</span>
              <Link to="/login" className="text-sm text-blue-600 hover:underline">
                Cambiar identificador
              </Link>
            </div>
          </div>

          {/* Password Input */}
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Introduce tu contraseña"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
              disabled={isLocked} // Bloquear el input si está bloqueado
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded mt-4"
            disabled={isLocked} // Bloquear el botón si está bloqueado
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;

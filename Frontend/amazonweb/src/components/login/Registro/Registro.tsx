import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Limpia el error al escribir
  };

  const validateName = (name) => {
    if (!name.trim()) return "El nombre es obligatorio.";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "El correo electrónico es obligatorio.";
    if (!emailRegex.test(email)) return "Introduce un correo válido.";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{9}$/;
    if (!phone.trim()) return "El número de teléfono es obligatorio.";
    if (!phoneRegex.test(phone)) return "Introduce un número de teléfono válido.";
    return "";
  };

  const validatePostalCode = (postalCode) => {
    if (!postalCode.trim()) return "El código postal es obligatorio.";
    return "";
  };

  const validateGender = (gender) => {
    if (!gender.trim()) return "El género es obligatorio.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "La contraseña es obligatoria.";
    if (password.length < 12) return "La contraseña debe tener al menos 12 caracteres.";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword.trim()) return "Debes confirmar tu contraseña.";
    if (confirmPassword !== password) return "Las contraseñas no coinciden.";
    return "";
  };

  const handleValidation = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      postalCode: validatePostalCode(formData.postalCode),
      gender: validateGender(formData.gender),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const response = await fetch("http://localhost:3000/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            type: "natural", // Se agrega automáticamente
          }),
        });

        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }

        const data = await response.json();
        alert(`Usuario registrado con éxito: ${data.name}`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          postalCode: "",
          gender: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Hubo un problema al registrar el usuario. Inténtalo nuevamente.");
      }
    }
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&#";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
    setErrors({ ...errors, password: "" });
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

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm text-gray-700"
      >
        <h1 className="text-xl font-semibold mb-4">Crear cuenta</h1>

        {/* Name */}
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Tu nombre
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombres y apellidos"
          className="w-full p-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white"
        />
        {errors.name && <p className="text-red-500 text-xs mb-4">{errors.name}</p>}

        {/* Email */}
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Correo electrónico
        </label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Introduce tu email"
          className="w-full p-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
        {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}

        {/* Phone */}
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Teléfono
        </label>
        <input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Introduce tu teléfono"
          className="w-full p-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
        {errors.phone && <p className="text-red-500 text-xs mb-4">{errors.phone}</p>}

        {/* Postal Code */}
        <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
          Código Postal
        </label>
        <input
          type="text"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Introduce tu código postal"
          className="w-full p-2 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
        {errors.postalCode && <p className="text-red-500 text-xs mb-4">{errors.postalCode}</p>}

        {/* Gender */}
        <label htmlFor="gender" className="block text-sm font-medium mb-1">
          Género
        </label>
        <select
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        >
          <option value="">Selecciona tu género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mb-4">{errors.gender}</p>}

        {/* Password */}
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña
        </label>
        <div className="flex items-center gap-2">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Como mínimo 12 caracteres"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
          <button
            type="button"
            onClick={generatePassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Sugerir
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password}</p>}

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Vuelve a escribir la contraseña
        </label>
        <div className="flex items-center gap-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showConfirmPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mb-4">{errors.confirmPassword}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded"
        >
          Continuar
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

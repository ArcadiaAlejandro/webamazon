            import React, { useState } from "react";

            const LanguageAndCurrencySettings = () => {
            const [language, setLanguage] = useState("es-ES");
            const [currency, setCurrency] = useState("USD");

            const handleLanguageChange = (e) => {
                setLanguage(e.target.value);
            };

            const handleCurrencyChange = (e) => {
                setCurrency(e.target.value);
            };

            const handleSaveChanges = () => {
                alert(`Idioma seleccionado: ${language}, Moneda seleccionada: ${currency}`);
            };

            return (
                <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 text-black pt-4   0 ">
                <div className="bg-white p-6 rounded shadow-md max-w-xl w-full">
                    <h1 className="text-2xl font-bold mb-6">Configuración</h1>

                    {/* Configuración de Idioma */}
                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Configuración de idioma</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Selecciona el idioma que prefieres utilizar para navegar, comprar y
                        comunicarte.
                    </p>
                    <div className="space-y-3">
                        <label className="flex items-center">
                        <input
                            type="radio"
                            value="en-US"
                            checked={language === "en-US"}
                            onChange={handleLanguageChange}
                            className="mr-2"
                        />
                        English - EN
                        </label>
                        <label className="flex items-center">
                        <input
                            type="radio"
                            value="es-ES"
                            checked={language === "es-ES"}
                            onChange={handleLanguageChange}
                            className="mr-2"
                        />
                        Español - ES
                        </label>
                        <label className="flex items-center">
                        <input
                            type="radio"
                            value="de-DE"
                            checked={language === "de-DE"}
                            onChange={handleLanguageChange}
                            className="mr-2"
                        />
                        Deutsch - DE
                        </label>
                        <label className="flex items-center">
                        <input
                            type="radio"
                            value="fr-FR"
                            checked={language === "fr-FR"}
                            onChange={handleLanguageChange}
                            className="mr-2"
                        />
                        Français - FR
                        </label>
                    </div>
                    </section>

                    {/* Configuración de Moneda */}
                    <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Configuración de moneda
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Selecciona la moneda con la que deseas comprar.
                    </p>
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="USD">$ - USD - Dólar estadounidense</option>
                        <option value="EUR">€ - EUR - Euro</option>
                        <option value="GBP">£ - GBP - Libra esterlina</option>
                        <option value="JPY">¥ - JPY - Yen japonés</option>
                    </select>
                    </section>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => alert("Cambios descartados")}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Guardar cambios
                    </button>
                    </div>
                </div>
                </div>
            );
            };

            export default LanguageAndCurrencySettings;

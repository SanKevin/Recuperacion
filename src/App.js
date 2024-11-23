import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]); // Estado para guardar los países
  const [loading, setLoading] = useState(true); // Estado para mostrar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para mostrar el país seleccionado

  const API_URL = "https://restcountries.com/v3.1/all"; // API de países

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true); // Mostrar "Cargando" antes de hacer la petición
        const response = await fetch(API_URL); // Hacer la solicitud
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Manejar errores HTTP
        }
        const result = await response.json(); // Convertir la respuesta a JSON
        setCountries(result.slice(0, 15)); // Guardar 15 países en el estado
      } catch (err) {
        setError(err.message); // Guardar el mensaje de error
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <h1>Cargando...</h1>; // Mostrar mientras carga
  if (error) return <h1>Error: {error}</h1>; // Mostrar si hay un error

  return (
    <div className="container">
      <h1>Examen de Recuperación</h1>

      {selectedCountry ? (
        <div className="detail-card">
          <h2>{selectedCountry.name.common}</h2>
          <img
            src={selectedCountry.flags.svg}
            alt={`Bandera de ${selectedCountry.name.common}`}
          />
          <p><strong>Capital:</strong> {selectedCountry.capital?.[0]}</p>
          <p><strong>Región:</strong> {selectedCountry.region}</p>
          <p><strong>Zona Horaria:</strong> {selectedCountry.timezones?.[0]}</p>
          <button onClick={() => setSelectedCountry(null)}>Volver</button>
        </div>
      ) : (
        <div className="card-container">
          {countries.map((country, index) => (
            <div
              key={index}
              className="card"
              onClick={() => setSelectedCountry(country)}
            >
              <img
                src={country.flags.svg}
                alt={`Bandera de ${country.name.common}`}
              />
              <h3>{country.name.common}</h3>
              <p><strong>Región:</strong> {country.region}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

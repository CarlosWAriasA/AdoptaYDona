import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../utils/constant";

const MensajesComponent = () => {
  const [mensajes, setMensajes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerMensajes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Mensajes`);

        if (!response.data || response.data.length === 0) {
          // Manejar el caso en el que no hay mensajes
          setMensajes([]);
        } else {
          setMensajes(response.data);
        }
      } catch (error) {
        console.error('Error al obtener la lista de mensajes', error);
        // Manejar el error, puedes mostrar un mensaje al usuario si lo deseas
      } finally {
        setIsLoading(false);
      }
    };

    obtenerMensajes();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Mensajes</h1>
      {isLoading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <ul>
          {mensajes.map(mensaje => (
            <li key={mensaje.id}>{mensaje.descripcion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MensajesComponent;
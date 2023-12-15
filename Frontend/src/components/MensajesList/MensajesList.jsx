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
        
          setMensajes([]);
        } else {
          setMensajes(response.data);
        }
      } catch (error) {
        console.error('Error al obtener la lista de mensajes', error);
      
      } finally {
        setIsLoading(false);
      }
    };

    obtenerMensajes();
  }, []); 

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
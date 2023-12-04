import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import defaultImage from '../../../public/default.jpg'; // Ruta de la imagen por defecto

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [hasAnimals, setHasAnimals] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Animales`);

        if (!response.ok) {
          throw new Error("Error al obtener la lista de animales");
        }

        const animalData = await response.json();

        setAnimals(animalData);
        setHasAnimals(animalData.length > 0);
      } catch (error) {
        console.error("Error al obtener la lista de animales", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxHeight: "calc(90vh - 0px)", overflowY: "auto" }}>
      {hasAnimals ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {animals.map((animal) => (
            <div
              key={animal.id}
              style={{
                margin: "20px",
                textAlign: "center",
                position: "relative",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                width: "250px",
                height: "250px",
                background: "#2d3748",
                color: "#fff",
                border: "2px solid #fff",
              }}
            >
              <img
                src={animal.imagenes?.length > 0
                  ? `data:image/jpeg;base64,${animal.imagenes[0]?.content}`
                  : defaultImage}
                alt={animal.nombre}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div style={{ padding: "10px 10px 5px 10px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {animal.nombre}
                </p>
              </div>
              <p
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: "#fff",
                  background: "#2d3748",
                  padding: "3px",
                  borderRadius: "2px",
                  fontWeight: "bold",
                }}
              >
                {animal.tipo}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          No hay animales registrados en el sistema
        </p>
      )}
    </div>
  );
};

export default AnimalList;
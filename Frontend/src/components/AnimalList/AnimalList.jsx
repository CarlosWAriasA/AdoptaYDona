import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";

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
    <div>
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
                margin: "10px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                maxWidth: "200px",
              }}
            >
              <img
                src={animal.imagen}
                alt={animal.nombre}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div style={{ padding: "10px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {animal.nombre}
                </p>
                {/* Puedes agregar más información del animal aquí si es necesario */}
              </div>
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

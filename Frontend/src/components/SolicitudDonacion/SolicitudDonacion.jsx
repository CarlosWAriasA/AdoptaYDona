import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import defaultImage from "../../assets/default.jpg"; // Ruta de la imagen por defecto
import ToastHelper from "../../utils/toast.helper";
import AnimalSkeleton from "../Skeletons/AnimalSkeleton";
import { useLocalStorage } from "react-use";
import { Button } from "flowbite-react";




const Donacion = ({ where, fetchData }) => {
  const [animals, setAnimals] = useState([]);
  const [hasAnimals, setHasAnimals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const [visible, setVisible] = useState(true);
  const [hiddenAnimals, setHiddenAnimals] = useState([]);

  const searchData = async (where) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...where,
        UsuarioId: user?.userId,
      }).toString();
      const url = `${BASE_URL}/Animales?${queryParams}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error al obtener la lista de animales");
      }

      const animalData = await response.json();

      setAnimals(animalData);
      setHasAnimals(animalData.length > 0);
    } catch (error) {
      console.error("Error al obtener la lista de animales", error);
      ToastHelper.errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {
    searchData(where);
  }, [fetchData]);


  /*const BotonSolicitud = (animalId) => {
    setHiddenAnimals((prevHiddenAnimals) => [...prevHiddenAnimals, animalId]);

    // Puedes agregar aquí la lógica para enviar el ID del animal al backend
    console.log(`Se ha solicitado una donacion para el animal con ID: ${animalId}`);
    ToastHelper.successToast("Se ha solicitado una donacion de este animal");
  };*/


  const SolicitudDonacion = async (animalId) => {
    setHiddenAnimals((prevHiddenAnimals) => [...prevHiddenAnimals, animalId]);
  
    try {
      const response = await fetch(
				`https://localhost:7092/api/SolicitudDonacion/SolicitarAnimal/${animalId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
      
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error al solicitar donación para el animal con ID: ${animalId}`);
      }
  
      ToastHelper.successToast("Se ha solicitado una donacion de este animal");
    } catch (error) {
      console.error(error.message);
      ToastHelper.errorToast(error.message);
    }
  };


  return (
    <main>
      <div className="flex justify-between mt-3" style={{ width: "100%", borderBottom: "2px solid white" }}>
        <h1 className="text-4xl ms-4 font-bold mb-4">Solicitud de Donación</h1>
      </div>

      <div style={{ maxHeight: "calc(90vh - 0px)", overflowY: "auto" }}>
        {isLoading ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: 8 }, (_, index) => (
              <AnimalSkeleton key={index} />
            ))}
          </div>
        ) : hasAnimals ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {animals.map((animal) => (
              !hiddenAnimals.includes(animal.id) && (
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
                    height: "300px",
                    background: "#2d3748",
                    color: "#fff",
                    border: "2px solid #fff",
                  }}
                >
                  <img
                    src={
                      animal.imagenes?.length > 0
                        ? `data:image/jpeg;base64,${animal.imagenes[0]?.content}`
                        : defaultImage
                    }
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
                    <button 
                      style={{
                        background: "#4CAF50",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        paddingRight: "20px"
                      }}
                      onClick={() => SolicitudDonacion(animal.id)}
                    >
                      Solicitar donacion 
                    </button> 
                  </div>
                  <p
                    className="rounded-lg"
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
              )
            ))}
          </div>
        ) : (
          <p className="mt-44 text-lg" style={{ textAlign: "center" }}>
          No se encontraron Animales
        </p>
      )}
    </div>


        



    </main>
    
  );
};

export default Donacion
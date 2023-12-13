import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Tooltip } from "flowbite-react";
import { useLocalStorage } from "react-use";
import ToastHelper from "../../utils/toast.helper";
import { BASE_URL } from "../../utils/constant";
import AnimalSkeleton from "../../components/Skeletons/AnimalSkeleton";
import defaultImage from "../../assets/default.jpg";

export default function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [hasPublicaciones, setHasPublicaciones] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage("user");

  const searchData = async () => {
    setIsLoading(true);
    try {
      const url = `${BASE_URL}/Publicaciones`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error al obtener la lista de publicaciones");
      }

      const animalData = await response.json();
      setPublicaciones(animalData);
      setHasPublicaciones(animalData.length > 0);
    } catch (error) {
      console.error("Error al obtener la lista de publicaciones", error);
      ToastHelper.errorToast(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

  return (
    <main>
      <div
        className="flex justify-between mt-3"
        style={{
          width: "100%",
          borderBottom: "2px solid white",
        }}
      >
        <h1 className="text-4xl ms-4 font-bold mb-4">Publicaciones</h1>
        <div className="flex">
          <Tooltip
            content="Nueva Publicación"
            className="text-black"
            style="light"
            placement="left"
            arrow={false}
            animation="duration-1000"
          >
            <Link to={"/publicaciones-edit"}>
              <PlusCircle className="mt-2 me-5 w-7 h-7 text-blue-400 hover:cursor-pointer" />
            </Link>
          </Tooltip>
        </div>
      </div>
      <div style={{ maxHeight: "calc(90vh - 0px)", overflowY: "auto" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <AnimalSkeleton key={index} />
            ))}
          </div>
        ) : hasPublicaciones ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {publicaciones.map((animal) => (
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
                  src={`data:image/jpeg;base64,${animal.imagenBase64}`}
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
                    {animal.comentario.length > 25
                      ? `${animal.comentario.substring(0, 26)}...`
                      : animal.comentario}
                  </p>
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
                  {animal.usuarioNombre}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-44 text-lg" style={{ textAlign: "center" }}>
            No se encontraron Publicaciones
          </p>
        )}
      </div>
    </main>
  );
}

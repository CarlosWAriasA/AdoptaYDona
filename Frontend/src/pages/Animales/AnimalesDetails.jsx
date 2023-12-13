import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import ToastHelper from "../../utils/toast.helper";
import AnimalCardDetail from "./AnimalCardDetail";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowBigLeft, Trash2 } from "lucide-react";
import { useLocalStorage } from "react-use";

const AnimalDetail = () => {
  const [user, setUser] = useLocalStorage("user");
  const [animalData, setAnimalData] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchAnimalById = async (animalId) => {
    try {
      const url = `${BASE_URL}/Animales/${animalId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error al obtener los datos del animal");
      }

      const animalData = await response.json();
      setAnimalData(animalData);
    } catch (error) {
      console.error("Error al obtener los datos del animal", error);
      ToastHelper.errorToast(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Animales/${animalData?.id}`, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        console.error("Error al realizar la solicitud DELETE");
        return;
      }

      ToastHelper.successToast("Animal Eliminado Exitosamente");
      navigate("/animales");
    } catch (error) {
      ToastHelper.error("Error inesperado", error);
    }
  };

  useEffect(() => {
    fetchAnimalById(id);
  }, [id]);

  return (
    <div
      style={{
        width: "100%",
        filter: openModal ? "blur(4px)" : "none",
      }}
    >
      <Modal
        className="mt-40 ms-64"
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        position={"center"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Estas Seguro que deseas eliminar este Animal?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-600"
                color="failure"
                onClick={handleDelete}
              >
                {"Si, Estoy seguro"}
              </Button>
              <Button
                className="bg-green-600"
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div style={{ borderBottom: "2px solid white" }}>
        <div className="flex justify-between mt-3">
          <div className="flex">
            <Link to={"/animales"} title="Volver Atras">
              <ArrowBigLeft className="mt-2 me-5 h-8 w-16 mb-4 text-blue-400 hover:cursor-pointer " />
            </Link>
            <h2 className="text-3xl font-bold mt-1">Detalles Animal</h2>
          </div>
          {animalData?.usuarioId === user.userId && (
            <div className="me-4 mt-2">
              <Trash2
                onClick={() => setOpenModal(true)}
                className="text-red-700 hover:bg-red-600 hover:text-black w-8 h-8 p-1 rounded-lg hover:cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {animalData ? (
        <div>
          <div
            className="mt-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {animalData.imagenes?.map((imagen, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imagen.content}`}
                alt={animalData.nombre}
                style={{
                  width: "100px",
                  height: "50px",
                  objectFit: "cover",
                  margin: "5px",
                  cursor: "pointer",
                  border:
                    index === hoveredImageIndex ? "2px solid blue" : "none",
                }}
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(0)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AnimalCardDetail
              title={`Nombre: ${animalData.nombre}`}
              image={`data:image/jpeg;base64,${animalData.imagenes[hoveredImageIndex]?.content}`}
              description={`Tipo: ${animalData.tipo}, Edad: ${animalData.edad}`}
            />
          </div>
        </div>
      ) : (
        <p>Cargando datos del animal...</p>
      )}
    </div>
  );
};

export default AnimalDetail;

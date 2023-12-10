import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUpload/ImageUploader";
import RequestHelper from "../../utils/request.helper";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import ToastHelper from "../../utils/toast.helper";
import { useLocalStorage } from "react-use";
import { Tooltip, Textarea, Label } from "flowbite-react";

export default function PublicacionesEdit() {
  const [user, setUser] = useLocalStorage("user");
  const [comentario, setComentario] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const navigate = useNavigate();

  const validate = () => {
    if (comentario === null || comentario === "") {
      ToastHelper.errorToast("El comentario es requerido");
      return false;
    }
    if (imagenes === null || imagenes.length < 1) {
      ToastHelper.errorToast("La Imagen es requerida");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await RequestHelper.post(`${BASE_URL}/Publicaciones`, {
          Comentario: comentario,
          ImagenBase64: imagenes[0]?.content,
          UsuarioId: user.userId,
        });

        if (response) {
          ToastHelper.successToast("Publicación publicada exitosamente");
          return navigate("/publicaciones");
        }
      } catch (error) {
        ToastHelper.errorToast(error.message);
      }
    }
  };

  return (
    <main
      style={{
        width: "100%",
      }}
    >
      <div style={{ borderBottom: "2px solid white" }}>
        <div className="flex mt-3">
          <Tooltip
            content="Volver Atras"
            className="text-black"
            style="light"
            placement="left"
            arrow={false}
          >
            <Link to={"/publicaciones"}>
              <ArrowBigLeft className="mt-2 me-5 h-8 w-16 mb-4 text-blue-400 hover:cursor-pointer " />
            </Link>
          </Tooltip>
          <h2 className="text-3xl font-bold mt-1">Publicar</h2>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="mt-4 ms-4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div className="mb-4">
          <Label htmlFor="comentario" className="block text-sm font-medium">
            Comentario
          </Label>
          <Textarea
            style={{ width: "600px" }}
            rows={6}
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="mt-1 p-2 border rounded-md bg-white text-black"
          />
        </div>
        <ImageUploader
          label="Imagen"
          multi={false}
          onImageChange={setImagenes}
          styles={{ width: "600px" }}
        />
        <button
          style={{ width: "600px" }}
          type="submit"
          className="bg-green-500 text-white py-2 rounded-md w-1/4 text-lg mt-4"
        >
          Publicar
        </button>
      </form>
    </main>
  );
}

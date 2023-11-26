import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUpload/ImageUploader";
import RequestHelper from "../../utils/request.helper";
import { BASE_URL } from "../../utils/constant";

export default function AnimalesEdit() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    RequestHelper.post(`${BASE_URL}/Animales`, {
      Nombre: name,
      Genero: genre,
      Tipo: type,
      Edad: age,
      Estatus: "A",
      Imagenes: imagenes.map((i) => ({
        Name: i.file.name,
        Size: i.file.size,
        Type: i.file.type,
        Content: i.content,
      })),
    });
  };

  useEffect(() => {
    console.log(imagenes);
  }, [imagenes]);

  return (
    <main
      style={{
        width: "100%",
      }}
    >
      <div style={{ borderBottom: "2px solid white" }}>
        <div className="flex mt-3">
          <Link to={"/animales"} title="Volver Atras">
            <ArrowBigLeft className="mt-2 me-5 h-8 w-16 mb-4 text-blue-400 hover:cursor-pointer " />
          </Link>
          <h2 className="text-3xl font-bold mt-1">
            Publicar Animal Para Adopción
          </h2>
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-4 ms-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-1/3 border rounded-md bg-white text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium">
            Genero
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 p-2 w-1/3 border rounded-md bg-white text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium ">
            Tipo
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 w-1/3 border rounded-md bg-white text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium ">
            Edad
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 w-1/3 border rounded-md bg-white text-black"
            required
          />
        </div>
        <ImageUploader onImageChange={setImagenes} />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded-md w-11/12 text-lg mt-4"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}

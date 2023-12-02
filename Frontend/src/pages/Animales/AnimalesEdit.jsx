import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { useState } from "react";
import ImageUploader from "../../components/ImageUpload/ImageUploader";
import RequestHelper from "../../utils/request.helper";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import ToastHelper from "../../utils/toast.helper";

export default function AnimalesEdit() {


  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const navigate = useNavigate();

  const validate = () => {
    if (name === null || name === "") {
      ToastHelper.errorToast("El nombre es requerido");
      return false;
    }
    if (genre === null || genre === "") {
      ToastHelper.errorToast("El genero es requerido");
      return false;
    }
    if (type === null || type === "") {
      ToastHelper.errorToast("El tipo es requerido");
      return false;
    }
    if (age === null || age === "") {
      ToastHelper.errorToast("La edad es requerida");
      return false;
    }
    if (imagenes === null || imagenes.length < 1) {
      ToastHelper.errorToast("Al menos una imagen es requerida");
      return false;
    }
    return true;
  };





  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await RequestHelper.post(`${BASE_URL}/Animales`, {
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

      if (response) {
        ToastHelper.successToast("Animal publicado exitosamente");
        return navigate("/animales");
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
          <Link to={"/animales"} title="Volver Atras">
            <ArrowBigLeft className="mt-2 me-5 h-8 w-16 mb-4 text-blue-400 hover:cursor-pointer " />
          </Link>
          <h2 className="text-3xl font-bold mt-1">
            Publicar Animal Para Adopción
          </h2>
        </div>  
      </div>
    
   <form onSubmit={onSubmit} className="flex flex-col items-center mt-4">
    <div className="form-container"> 
  <div className="wrapper">
    <label htmlFor="name" className="block text-sm font-medium">
      Nombre
    </label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
       
    />
  </div><br></br>
 
  <div className="wrapper">
    <label htmlFor="genre" className="block text-sm font-medium">
      Genero
    </label>
    <input
      type="text"
      id="genre"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
       
    />
  </div><br></br>

  <div className="wrapper">
    <label htmlFor="type" className="block text-sm font-medium">
      Tipo
    </label>
    <input
      type="text"
      id="type"
      value={type}
      onChange={(e) => setType(e.target.value)}
       
    />
  </div><br></br>

  <div className="wrapper">
    <label htmlFor="age"  className="block text-sm font-medium">
      Edad
    </label>
    <input
      type="number"
      id="age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
       
    />
  </div><br></br>
 
  <ImageUploader id="img" onImageChange={setImagenes} />

  

  <button
    type="submit"
      
  >
    Publicar
  </button>
  </div>
</form>
 
 
    </main>
    
  );
}

import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimalList from "../../components/AnimalList/AnimalList";

export default function AnimalesList() {
  return (
    <main>
      <div className="flex justify-between mt-3" style={{
        width: "100%",
        borderBottom: "2px solid white",
      }}>
        <h1 className="text-4xl ms-4 font-bold mb-4">Animales</h1>
        <Link to={"/animales-edit"} title="Publicar Animal Para Adopcion">
          <PlusCircle className="mt-2 me-5 h-8 text-blue-400 hover:cursor-pointer" />
        </Link>
      </div>

      {<AnimalList />}
    </main>
  );
}


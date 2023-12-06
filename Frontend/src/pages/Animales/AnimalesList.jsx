import { PlusCircle, Filter, ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimalList from "../../components/AnimalList/AnimalList";
import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Tooltip } from "flowbite-react";

export default function AnimalesList() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [where, setWhere] = useState({});

  const handleShowSidebar = () => setShowSidebar((preValue) => !preValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchData((prev) => !prev);
    setShowSidebar(false);
  };

  return (
    <main>
      {showSidebar && (
        <Sidebar
          aria-label="Sidebar with content separator example"
          className="absolute right-0 bottom-0 bg-gray-500 hover:cursor-pointer w-1/4 rounded-sm z-30"
        >
          <Sidebar.Items>
            <div className="flex justify-between">
              <Tooltip content="Cerrar" placement="left">
                <ArrowRightCircle
                  className="fill-green-800 w-8 h-8"
                  onClick={handleShowSidebar}
                />
              </Tooltip>
            </div>
            <form
              className="flex max-w-md flex-col gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="nombre" value="Nombre" />
                </div>
                <TextInput
                  id="nombre"
                  type="text"
                  value={where?.Nombre}
                  onChange={(e) =>
                    setWhere((prev) => ({ ...prev, Nombre: e.target.value }))
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="genero" value="Genero" />
                </div>
                <TextInput
                  id="genero"
                  type="text"
                  value={where?.Genero}
                  onChange={(e) =>
                    setWhere((prev) => ({ ...prev, Genero: e.target.value }))
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tipo" value="Tipo" />
                </div>
                <TextInput
                  id="tipo"
                  type="text"
                  value={where?.Tipo}
                  onChange={(e) =>
                    setWhere((prev) => ({ ...prev, Tipo: e.target.value }))
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="edad" value="Edad" />
                </div>
                <TextInput
                  id="edad"
                  type="number"
                  value={where?.Edad === null ? "" : where?.Edad}
                  onChange={(e) => {
                    const input = e.target.value.trim();
                    if (input !== "") {
                      const parsedValue = Number(input);
                      if (!isNaN(parsedValue)) {
                        setWhere((prev) => ({
                          ...prev,
                          Edad: parsedValue,
                        }));
                      }
                    } else {
                      setWhere((prev) => ({
                        ...prev,
                        Edad: "",
                      }));
                    }
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="solo-mis"
                  className="hover:cursor-pointer"
                  checked={where?.SoloMis ?? false}
                  onChange={(e) =>
                    setWhere((prev) => ({ ...prev, SoloMis: e.target.checked }))
                  }
                />
                <Label htmlFor="solo-mis">Solo mis Animales</Label>
              </div>
              <Button type="submit" className="bg-green-700">
                Buscar
              </Button>
            </form>
          </Sidebar.Items>
        </Sidebar>
      )}
      <div
        className="flex justify-between mt-3"
        style={{
          width: "100%",
          borderBottom: "2px solid white",
        }}
      >
        <h1 className="text-4xl ms-4 font-bold mb-4">Animales</h1>
        <div className="flex">
          <Tooltip content="filtrar" placement="left">
            <Filter
              className="mt-2 me-5 w-7 h-7 text-blue-400 hover:cursor-pointer"
              onClick={handleShowSidebar}
            />
          </Tooltip>
          <Tooltip content="Publicar Animal" placement="bottom">
            <Link to={"/animales-edit"}>
              <PlusCircle className="mt-2 me-5 w-7 h-7 text-blue-400 hover:cursor-pointer" />
            </Link>
          </Tooltip>
        </div>
      </div>

      {<AnimalList where={where} fetchData={fetchData} />}
    </main>
  );
}

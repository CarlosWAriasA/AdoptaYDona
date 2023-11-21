import React from 'react';

interface AnimalListProps {
  animals: Animal[];
}

interface Animal {
  nombre: string;
  genero: string;
  status: string;
  tipo: string;
  edad: number;
  usuarioId: number;
  photos: string[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  return (
    <div>
      {animals.length > 0 ? (
        animals.map((animal) => (
          <div key={animal.nombre}>
            <img src={animal.photos[0]} alt={animal.nombre} />
            <p>{animal.nombre}</p>
            <p>Gender: {animal.genero}</p>
            <p>Status: {animal.status}</p>
            <p>Type: {animal.tipo}</p>
            <p>Age: {animal.edad}</p>
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No hay animales registrados en el sistema.</p>
      )}
    </div>
  );
};

export default AnimalList;
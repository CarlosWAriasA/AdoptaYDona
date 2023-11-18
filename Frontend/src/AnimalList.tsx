import React from 'react';
import './AnimalList.css';

interface Animal {
  name: string;
  photo: string;
}

interface AnimalListProps {
  animals: Animal[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  return (
    <div>
      {animals.length > 0 ? (
        animals.map((animal) => (
          <div key={animal.name}>
            <img src={animal.photo} alt={animal.name} />
            <p>{animal.name}</p>
          </div>
        ))
      ) : (
        <p>No hay animales registrados en el sistema.</p>
      )}
    </div>
  );
};

export default AnimalList;

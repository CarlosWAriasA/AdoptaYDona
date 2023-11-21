import React, { useEffect, useState } from 'react';
import './App.css';
import AnimalList from './AnimalList';
import Animal from './Types';

const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:port/api/Animales');
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []); 

  return (
    <div>
      <h1>Listado de Animales</h1>
      <AnimalList animals={animals} />
    </div>
  );
};

export default App;

import './App.css'
import React from 'react';
import AnimalList from './AnimalList';

const App: React.FC = () => {
  const animals = [
    { name: 'Perro', photo: 'dog.jpg' },
    { name: 'Gato', photo: 'cat.jpg' },
    // Agrega más animales según sea necesario
  ];

  return (
    <div>
      <h1>Listado de Animales</h1>
      <AnimalList animals={animals} />
    </div>
  );
};

export default App;
import Animal from './Types';
import React, { useState } from 'react';

interface AdminAnimalEditProps {
  animal: Animal;
  onEdit: (updatedAnimal: Animal) => void;
}

const AdminAnimalEdit: React.FC<AdminAnimalEditProps> = ({ animal, onEdit }) => {
  const [editedAnimal, setEditedAnimal] = useState(animal);

  const handleEdit = () => {
    // Lógica para enviar los cambios al servidor
    onEdit(editedAnimal);
  };

  return (
    <div>
      {/* Agrega campos de edición según sea necesario */}
      <button onClick={handleEdit}>Guardar Cambios</button>
    </div>
  );
};

export default AdminAnimalEdit;

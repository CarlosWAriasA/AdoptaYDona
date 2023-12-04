// AnimalSkeleton.js
import React from "react";
import "./AnimalSkeleton.css"; // Importa los estilos CSS

const AnimalSkeleton = () => {
  return (
    <div className="animal-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-name"></div>
        <div className="skeleton-type"></div>
      </div>
    </div>
  );
};

export default AnimalSkeleton;

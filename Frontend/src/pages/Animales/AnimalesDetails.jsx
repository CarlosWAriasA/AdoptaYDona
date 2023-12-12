import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../utils/constant"
import defaultImage from "../../assets/default.jpg"
import ToastHelper from "../../utils/toast.helper"
import AnimalCardDetail from "./AnimalCardDetail"

const AnimalDetail = () => {
	const [animalData, setAnimalData] = useState(null)
	const [hoveredImageIndex, setHoveredImageIndex] = useState(0) // Set the default index to 0

	const { id } = useParams()

	const fetchAnimalById = async (animalId) => {
		try {
			const url = `${BASE_URL}/Animales/${animalId}`
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error("Error al obtener los datos del animal")
			}

			const animalData = await response.json()
			setAnimalData(animalData)
			console.log(animalData)
		} catch (error) {
			console.error("Error al obtener los datos del animal", error)
			ToastHelper.errorToast(error.message)
		}
	}

	useEffect(() => {
		fetchAnimalById(id)
	}, [id])

	return (
		<div>
			<h1 className='text-center'>Detalles del animal</h1>
			{animalData ? (
				<div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						{animalData.imagenes?.map((imagen, index) => (
							<img
								key={index}
								src={`data:image/jpeg;base64,${imagen.content}`}
								alt={animalData.nombre}
								style={{
									width: "100px",
									height: "50px",
									objectFit: "cover",
									margin: "5px",
									cursor: "pointer",
									border:
										index === hoveredImageIndex ? "2px solid blue" : "none",
								}}
								onMouseEnter={() => setHoveredImageIndex(index)}
								onMouseLeave={() => setHoveredImageIndex(0)} // Reset to the default index when leaving the image
							/>
						))}
					</div>
					<div className='flex justify-center'>
						<AnimalCardDetail
							title={`Nombre: ${animalData.nombre}`}
							image={`data:image/jpeg;base64,${animalData.imagenes[hoveredImageIndex]?.content}`}
							description={`Tipo: ${animalData.tipo}, Edad: ${animalData.edad}`}
						/>
					</div>
				</div>
			) : (
				<p>Cargando datos del animal...</p>
			)}
		</div>
	)
}

export default AnimalDetail
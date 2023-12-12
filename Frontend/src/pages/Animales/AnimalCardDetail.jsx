import React from "react"

const AnimalCardDetail = ({ title, image, description }) => {
	return (
		<div className='max-w-xs rounded overflow-hidden shadow-lg mx-auto'>
			<img className='w-full' src={image} alt='Card image' />
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2'>{title}</div>
				<p className='text-white text-base'>{description}</p>
			</div>
		</div>
	)
}

export default AnimalCardDetail

import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ImageUploader({ onImageChange }) {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const fileList = e.target.files;

    if (fileList.length > 0) {
      const selectedImages = Array.from(fileList);

      Promise.all(
        selectedImages.map((image) => {
          return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;
              resolve({
                file: image,
                content: btoa(
                  String.fromCharCode(...new Uint8Array(arrayBuffer))
                ),
              });
            };

            reader.readAsArrayBuffer(image);
          });
        })
      ).then((imagesWithContent) => {
        setImages(imagesWithContent);
        onImageChange(imagesWithContent);
      });
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="image" className="block text-sm font-medium ">
        Imagenes
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 p-2 w-1/2 border rounded-md"
        multiple
      />
      {images.length > 0 && (
        <div className="mt-2 flex gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image.file)}
              alt={`Preview ${index}`}
              className="mr-2 h-24 w-24 rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

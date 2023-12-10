import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ImageUploader({
  label = "Imagenes (Máximo 10)",
  multi = true,
  onImageChange,
  styles = { width: "50%" },
}) {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const fileList = e.target.files;

    if (fileList.length > 0) {
      const selectedImages = Array.from(fileList);

      if (selectedImages.length + images.length > 10) {
        const remainingSlots = 10 - images.length;
        selectedImages.splice(remainingSlots);
      }

      Promise.all(
        selectedImages.map((image) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            const chunkSize = 8192;

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;
              let binaryString = "";

              for (let i = 0; i < arrayBuffer.byteLength; i += chunkSize) {
                const chunk = new Uint8Array(
                  arrayBuffer,
                  i,
                  Math.min(chunkSize, arrayBuffer.byteLength - i)
                );
                binaryString += String.fromCharCode.apply(null, chunk);
              }

              const base64EncodedContent = btoa(binaryString);

              resolve({
                file: image,
                content: base64EncodedContent,
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
        {label}
      </label>
      <input
        style={styles}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 p-2 border rounded-md"
        multiple={multi}
      />
      {images.length > 0 && (
        <div
          className="mt-2 flex gap-2 flex-wrap"
          style={{ maxWidth: "1400px" }}
        >
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

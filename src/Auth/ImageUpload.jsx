import React from 'react';
import { useField } from 'formik';
import { Image } from 'cloudinary-react';

const ImageUpload = ({ name, setFieldValue }) => {
  const [field, meta] = useField(name);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'txgf9z4m'); 

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/da5lphikg/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFieldValue(name, data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Profile Picture
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="form-input"
      />
      {meta.touched && meta.error && <p className="text-red-500 text-sm mt-1">{meta.error}</p>}
      {field.value && <Image cloudName="your_cloud_name" publicId={field.value} width="100" />}
    </div>
  );
};

export { ImageUpload };

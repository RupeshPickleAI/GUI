import React, { useState, useEffect } from 'react';
import '/src/App.css';
import "../../styles/global.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  const loadRandomImages = async () => {
    try {
      const imagesPath = "D:/new photos/";
      const response = await window.electron.getRandomImages(imagesPath);
      setImages(response || []);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  useEffect(() => {
    loadRandomImages();
  }, []);

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 uppercase tracking-wide mb-4">
          Image Gallery
        </h1>
        <p className="text-lg text-gray-600">
          Browse through random images from the collection.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {images.map((fileName, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg 
                                    hover:transform hover:-translate-y-1 transition-all duration-300">
            <img
              src={`file:///D:/new photos/${fileName}`}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-800">{fileName}</h3>
              <p className="text-sm text-gray-600">
                Added: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={loadRandomImages}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 text-white rounded-full 
                 shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 
                 transition-all duration-300 hover:rotate-180"
      >
        <i className="fas fa-sync-alt"></i>
      </button>
    </div>
  );
};

export default ImageGallery;
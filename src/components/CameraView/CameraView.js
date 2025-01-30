import React, { useState, useEffect } from 'react';

const CameraView = () => {
  const [cameraFeeds, setCameraFeeds] = useState({});
  const cameraPositions = [0, 1, 2, 3, 4, 5, 6, 7, 16];
  const configPath = 'C:/Users/Rupesh/OneDrive/Desktop/config.json';

  useEffect(() => {
    const updateCameras = async () => {
      try {
        const response = await fetch('file:///' + configPath);
        const data = await response.json();
        setCameraFeeds(data.cameraImages || {});
      } catch (error) {
        console.error('Error updating cameras:', error);
      }
    };

    const interval = setInterval(updateCameras, 100);
    updateCameras();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-grow p-5 bg-gray-50" style={{background:"blue", height:"500px" , width:"600px"}} >
      <div className="text-center p-8 mb-8 bg-gradient-to-r from-slate-800 to-blue-600 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-3 uppercase tracking-wider text-shadow">
          <i className="fas fa-video mr-3"></i>Live Camera Feed
        </h1>
        <p className="text-white text-opacity-90 max-w-3xl mx-auto leading-relaxed">
          Real-time surveillance monitoring system for all production units.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto p-5">
        {cameraPositions.map((index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-slate-800 to-blue-600 p-4 text-white text-center">
              <h2 className="text-lg font-semibold uppercase tracking-wide">
                <i className="fas fa-video mr-2"></i> Machine {index + 1}
              </h2>
            </div>
            <div className="h-[300px] relative">
              <img
                src={cameraFeeds[index] ?
                  (cameraFeeds[index].startsWith('data:image/') ?
                    cameraFeeds[index] :
                    `data:image/jpeg;base64,${cameraFeeds[index]}`) :
                  '/api/placeholder/640/480'}
                alt={`Camera ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraView;
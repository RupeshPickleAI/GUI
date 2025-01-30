import React, { useState, useEffect } from 'react';
import '/src/App.css';
import "../../styles/global.css"

const MachineStatus = () => {
  const [machines, setMachines] = useState([]);
  const machineStatusPath = 'C:/Users/Rupesh/OneDrive/Desktop/machine_status.json';

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const response = await fetch('file:///' + machineStatusPath);
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Error loading machine status:', error);
      }
    };

    const interval = setInterval(updateStatus, 500);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-slate-800 to-blue-500 rounded-xl p-8 mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          <i className="fas fa-industry mr-3"></i>Machine Status Monitor
        </h1>
        <p className="text-white text-opacity-90">
          Real-time monitoring dashboard displaying the operational status of all production units.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        {machines.map((machine, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:transform 
                                    hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                <i className="fas fa-robot text-blue-500"></i>
                {machine.machine_name}
              </div>
              <div className={`px-6 py-3 rounded-full flex items-center gap-2 
                            ${machine.status === 0 ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                <i className={`fas ${machine.status === 0 ? 'fa-gear fa-spin' : 'fa-pause'}`}></i>
                {machine.status === 0 ? 'Running' : 'Idle'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineStatus;
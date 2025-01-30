import React from 'react';
import '/src/App.css';
import "../../styles/code.css"


const CodeView = () => {
  const machineScripts = {
    1: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/main.py' },
    2: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/main1.py' },
    3: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine3.py' },
    4: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine4.py' },
    5: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine5.py' },
    6: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine6.py' },
    7: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine7.py' },
    8: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine8.py' },
    17: { pythonPath: 'C:/Users/Rupesh/AppData/Local/Programs/Python/Python313/python.exe', scriptPath: 'C:/Users/Rupesh/Electron_Project/machine9.py' },
  };

  const runScript = async (machineNumber) => {
    try {
      const machine = machineScripts[machineNumber];
      if (!machine) {
        console.error(`No configuration found for Machine ${machineNumber}`);
        return;
      }
      await window.electron.runPythonScript(machine.pythonPath, machine.scriptPath);
      console.log(`Machine ${machineNumber} script executed`);
    } catch (error) {
      console.error(`Error running Machine ${machineNumber}:`, error);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1>
          Machine Control Panel
        </h1>
        <p className="text-lg text-gray-600">Select a machine to initiate its operation sequence.</p>
      </div>
      
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.keys(machineScripts).map(num => (
          <button
            key={num}
            onClick={() => runScript(Number(num))}
            className="code-button min-h-[180px] bg-gradient-to-br from-green-600 to-green-400 
                     text-white rounded-xl p-6 font-semibold uppercase tracking-wide 
                     shadow-md hover:shadow-xl transition-all duration-300 
                     flex flex-col items-center justify-center gap-4 text-xl"
          >
            <div className="w-24 h-24">
              <img
                src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/unileverremovebgpreview.png"
                alt="Unilever Logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            Machine {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeView;
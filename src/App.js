// App.js
import React, { useState } from 'react';
import './styles/global.css';
import Sidebar from './components/Sidebar/SideBar';
import CameraView from './components/CameraView/CameraView';
import CodeView from './components/CodeView/CodeView';
import MachineStatus from './components/MachineStatus/MachineStatus';
import ImageGallery from './components/ImageGallery/ImageGallery';

const App = () => {
  const [activeSection, setActiveSection] = useState('code');

  const renderContent = () => {
    switch (activeSection) {
      case 'camera':
        return <CameraView />;
      case 'code':
        return <CodeView />;
      case 'machine_status':
        return <MachineStatus />;
      case 'images':
        return <ImageGallery />;
      default:
        return <CodeView />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
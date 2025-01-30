import React from 'react';
import '/src/App.css'
import "../../styles/global.css"

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navButtons = [
    { id: 'code', icon: 'fa-code', label: 'Code' },
    { id: 'camera', icon: 'fa-camera', label: 'Camera' },
    { id: 'machine_status', icon: 'fa-cogs', label: 'Machine Status' },
    { id: 'images', icon: 'fa-images', label: 'Images' }
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
      </div>
      
      <div className="nav-buttons">
        {navButtons.map(button => (
          <button
            key={button.id}
            onClick={() => setActiveSection(button.id)}
            className={`nav-button ${activeSection === button.id ? 'active' : ''}`}
          >
            <i className={`fas ${button.icon}`}></i>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
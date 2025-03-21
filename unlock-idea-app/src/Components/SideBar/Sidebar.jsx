import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  const handleNavigate = (path) => {
    setActiveItem(path); // Set the clicked menu item as active
    navigate(path);
  };

  const menuItems = [
    { label: 'DashBoard', path: '/home/Dashboard' },
    { label: 'Menu', path: '/home/Menu' },
    { label: 'Available Products', path: '/home/AvailableProducts' },
    { label: 'Connect', path: '/home/Connect' },
    { label: 'Share Up Idea', path: '/home/IdeaShare' },
    { label: 'Products', path: '/home/Products' },
    { label: 'Help Line', path: '/home/HelpLine' },
    { label: 'About', path: '/home/About' },
  ];

  return (
    <div className="sidebarcontainer">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`sidebarlist ${activeItem === item.path ? 'active' : ''}`}
          onClick={() => handleNavigate(item.path)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

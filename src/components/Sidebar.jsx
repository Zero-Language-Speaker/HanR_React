// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import icon from './icon.png';
import './Sidebar.css';

const Sidebar = ({ toggleChatBot, showChatBot }) => {
  return (
    <aside className="sidebar">
      <Link to="/">
        <img src={icon} alt="App Icon" className="app-icon" />
      </Link>

      <ul className="menu-list">
        <li>
          <Link to="/word-learning">
            <button className="menu-button">단어 학습</button>
          </Link>
        </li>
        <li>
        <button 
            className={`menu-button ${showChatBot ? 'active' : ''}`}
            onClick={toggleChatBot}
          >
            챗봇 호출
          </button>
        </li>
        <li>
          <Link to="/sentences">
            <button className="menu-button">문맥 학습</button>
          </Link>
        </li>
        <li>
          <Link to="/word-list">
            <button className="menu-button">단어장 이동</button>
          </Link>
        </li>
        <li>
          <button className="menu-button">Menu Label</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
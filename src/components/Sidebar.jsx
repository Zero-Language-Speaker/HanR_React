// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from './icon.png';
import './Sidebar.css';

const Sidebar = ({ toggleChatBot, showChatBot }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', { email, password });
  };

  return (
    <aside className="sidebar">
      <Link to="/">
        <img src={icon} alt="App Icon" className="app-icon" />
      </Link>


      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">로그인</button>
        <Link to="/signup" className="signup-link">회원가입</Link>
      </form>



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
          <button className="menu-button"></button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
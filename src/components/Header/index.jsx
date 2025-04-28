// src/components/Header.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchGames } from '../../store/slices/gamesSlice';
import { login, logout } from '../../store/slices/authSlice';
import './Header.scss'; // Добавьте эту строку


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, balance } = useSelector(state => state.auth);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchGames(e.target.value));
  };

  const handleLogin = () => {
    // В реальном приложении здесь будет запрос к API
    dispatch(login({ username: 'testUser', balance: 10000 }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <span className="logo-text-dark">da</span>
          <span className="logo-text-purple">ddy</span>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <div className="user-balance">{balance} ₽</div>
              <button className="btn-login" onClick={handleLogout}>Выход</button>
            </>
          ) : (
            <>
              <button className="btn-login" onClick={handleLogin}>Вход</button>
              <button className="btn-register">Регистрация</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
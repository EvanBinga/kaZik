// src/components/NavMenu/index.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../store/slices/gamesSlice';
import './NavMenu.scss';

const NavMenu = () => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(state => state.games);
  
  const categories = [
    { id: 'popular', name: 'Популярные', icon: '🔥' },
    { id: 'new', name: 'Новые', icon: '🕒' },
    { id: 'slots', name: 'Слоты', icon: '🎰' },
    { id: 'fast', name: 'Быстрые Игры', icon: '⚡' },
    { id: 'bonus', name: 'Покупка Бонуса', icon: '🎁' },
    { id: 'jackpot', name: 'Джекпоты', icon: '💰' },
    { id: 'free', name: 'Открыши Бонуса', icon: '🎉' },
  ];

  const handleCategoryClick = (categoryId) => {
    dispatch(setActiveCategory(categoryId));
  };

  return (
    <nav className="nav-menu">
      <div className="container nav-container">
        <ul className="nav-list">
          {categories.map(category => (
            <li 
              key={category.id} 
              className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="nav-icon">{category.icon}</span>
              <span className="nav-text">{category.name}</span>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="search-small">
            <span>Поиск</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <div className="providers-filter">
            <span>Все провайдеры</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
// src/pages/GamePage/index.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GamePage.scss';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games } = useSelector(state => state.games);
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameView, setGameView] = useState('play'); // 'play' или 'info'

  useEffect(() => {
    // Находим игру по ID из URL
    if (games.length > 0) {
      const foundGame = games.find(g => g.id.toString() === id);
      if (foundGame) {
        setGame(foundGame);
      } else {
        // Игра не найдена, перенаправляем на главную
        navigate('/');
      }
      setIsLoading(false);
    }
  }, [games, id, navigate]);

  if (isLoading) {
    return <div className="game-page-loading">Загрузка игры...</div>;
  }

  if (!game) {
    return <div className="game-page-error">Игра не найдена</div>;
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="game-breadcrumbs">
          <span onClick={() => navigate('/')} className="breadcrumb-link">Главная</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{game.title}</span>
        </div>
        <h1 className="game-page-title">{game.title}</h1>
        <div className="game-provider-info">
          <span className="provider-label">Провайдер:</span>
          <span className="provider-name">{game.provider}</span>
        </div>
      </div>

      <div className="game-page-tabs">
        <button 
          className={`game-tab ${gameView === 'play' ? 'active' : ''}`}
          onClick={() => setGameView('play')}
        >
          Играть
        </button>
        <button 
          className={`game-tab ${gameView === 'info' ? 'active' : ''}`}
          onClick={() => setGameView('info')}
        >
          Информация
        </button>
      </div>

      {gameView === 'play' ? (
        <div className="game-play-area">
          <div className="game-frame">
            {/* Здесь будет iframe с игрой или placeholder */}
            <div className="game-placeholder">
              <img src={game.image} alt={game.title} className="game-placeholder-image" />
              <div className="game-play-overlay">
                <button className="play-real-btn">Играть на деньги</button>
                <button className="play-demo-btn">Демо-режим</button>
              </div>
            </div>
          </div>
          <div className="game-controls">
            <button className="fullscreen-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <span>Полный экран</span>
            </button>
            <button className="favorite-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              <span>В избранное</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="game-info-area">
          <div className="game-description">
            <h2>Описание игры</h2>
            <p>
              {game.title} - это захватывающий игровой автомат от провайдера {game.provider}.
              Игра отличается высоким качеством графики, увлекательным геймплеем и возможностью выиграть крупные призы.
            </p>
            {game.features && game.features.length > 0 && (
              <>
                <h3>Особенности:</h3>
                <ul className="game-features-list">
                  {game.features.map((feature, index) => (
                    <li key={index} className="feature-item">{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="game-specs">
            <h2>Технические характеристики</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Провайдер:</span>
                <span className="spec-value">{game.provider}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Тип игры:</span>
                <span className="spec-value">
                  {game.category === 'slots' && 'Слоты'}
                  {game.category === 'table' && 'Настольные игры'}
                  {game.category === 'fast' && 'Быстрые игры'}
                  {game.category === 'jackpot' && 'Джекпоты'}
                  {game.category === 'bonus' && 'Бонусные игры'}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Волатильность:</span>
                <span className="spec-value">Средняя</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">RTP:</span>
                <span className="spec-value">96.5%</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Макс. выигрыш:</span>
                <span className="spec-value">x5000</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Год выпуска:</span>
                <span className="spec-value">2023</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="similar-games">
        <h2>Похожие игры</h2>
        <div className="similar-games-grid">
          {games
            .filter(g => g.category === game.category && g.id !== game.id)
            .slice(0, 4)
            .map(similarGame => (
              <div 
                key={similarGame.id} 
                className="similar-game-card"
                onClick={() => {
                  navigate(`/game/${similarGame.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="similar-game-image" style={{ backgroundImage: `url(${similarGame.image})` }}></div>
                <div className="similar-game-title">{similarGame.title}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
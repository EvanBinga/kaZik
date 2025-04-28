// src/components/GameGrid/index.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../GameCard';
import './GameGrid.scss';

const GameGrid = () => {
  const { filteredGames, isLoading, error } = useSelector(state => state.games);

  if (isLoading) {
    return <div className="loading">Загрузка игр...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="game-grid">
      {filteredGames.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
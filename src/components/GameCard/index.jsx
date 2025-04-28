import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.scss';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-image" style={{ backgroundImage: `url(${game.image})` }}>
        {game.isNew && <span className="game-badge new-badge">New</span>}
        {game.isPopular && <span className="game-badge popular-badge">Hot</span>}
        <div className="game-overlay">
          <div className="game-buttons">
            <Link to={`/game/${game.id}`} className="play-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </Link>
            <button className="demo-button">Demo</button>
          </div>
        </div>
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <div className="game-provider">{game.provider}</div>
        {game.features && game.features.length > 0 && (
          <div className="game-features">
            {game.features.map((feature, index) => (
              <span key={index} className="game-feature">{feature}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
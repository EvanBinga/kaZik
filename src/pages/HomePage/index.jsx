import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/slices/gamesSlice';
import NavMenu from '../../components/NavMenu';
import GameGrid from '../../components/GameGrid';

const HomePage = () => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(state => state.games);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  let categoryTitle = "Слоты";
  switch(activeCategory) {
    case 'popular': categoryTitle = "Популярные"; break;
    case 'new': categoryTitle = "Новые"; break;
    case 'fast': categoryTitle = "Быстрые Игры"; break;
    case 'bonus': categoryTitle = "Покупка Бонуса"; break;
    case 'jackpot': categoryTitle = "Джекпоты"; break;
    case 'free': categoryTitle = "Открыши Бонуса"; break;
    default: categoryTitle = "Слоты";
  }

  return (
    <div className="main-content">
      <NavMenu />
      <div className="container">
        <h1 className="category-title">{categoryTitle}</h1>
        <GameGrid />
        <div className="show-more-wrapper">
          <button className="show-more-btn">Показать больше</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
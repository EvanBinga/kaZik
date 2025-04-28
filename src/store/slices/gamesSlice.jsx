

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Асинхронный action для загрузки игр
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { rejectWithValue }) => {
    try {
      return mockGames;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: [],
  filteredGames: [],
  activeCategory: 'slots',
  isLoading: false,
  error: null,
};
// src/store/slices/gamesSlice.js - обновите массив mockGames

const mockGames = [
  {
    id: 1,
    title: 'Holiday Joker',
    image: 'https://placehold.co/300x200/8A2BE2/FFFFFF?text=Holiday+Joker',
    provider: 'Pragmatic Play',
    category: 'slots',
    isPopular: true,
    features: ['Бонусы', 'Фриспины']
  },
  {
    id: 2,
    title: 'Fruit Mania',
    image: 'https://placehold.co/300x200/FF6347/FFFFFF?text=Fruit+Mania',
    provider: 'NetEnt',
    category: 'slots',
    isNew: true,
    features: ['Дикие символы']
  },
  {
    id: 3,
    title: 'Tropical Joker',
    image: 'https://placehold.co/300x200/20B2AA/FFFFFF?text=Tropical+Joker',
    provider: 'Play\'n GO',
    category: 'slots',
    features: ['Мультипликаторы']
  },
  {
    id: 4,
    title: 'Heavy Metal',
    image: 'https://placehold.co/300x200/4B0082/FFFFFF?text=Heavy+Metal',
    provider: 'Microgaming',
    category: 'slots',
    features: ['Риск-игра']
  },
  {
    id: 5,
    title: 'Candy Blitz',
    image: 'https://placehold.co/300x200/FF69B4/FFFFFF?text=Candy+Blitz',
    provider: 'Yggdrasil',
    category: 'slots',
    isNew: true,
    features: ['Респины']
  }
  // Продолжите для остальных игр по такому же шаблону
];

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredGames = state.games;
      } else if (action.payload === 'popular') {
        state.filteredGames = state.games.filter(game => game.isPopular);
      } else if (action.payload === 'new') {
        state.filteredGames = state.games.filter(game => game.isNew);
      } else {
        state.filteredGames = state.games.filter(
          game => game.category === action.payload
        );
      }
    },
    searchGames: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredGames = state.games.filter(
        game => game.title.toLowerCase().includes(searchTerm) || 
                game.provider.toLowerCase().includes(searchTerm)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
        state.filteredGames = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory, searchGames } = gamesSlice.actions;
export default gamesSlice.reducer;
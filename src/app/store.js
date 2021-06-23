import { configureStore } from '@reduxjs/toolkit';
import weatherReduce from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReduce,
  },
});

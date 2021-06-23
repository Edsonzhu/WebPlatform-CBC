import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';

const GRAPHQL_API = 'http://localhost:4000';

const initialState = {
  city: '',
  country: '',
  summary: {},
  temperature: {},
  timestamp: 0,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city) => {
    const query = gql`
    query($city: String!) {
      getCityByName(name: $city, config: {units: imperial}) {
        name, 
        country,
        weather {
          summary {
            title,
            icon
          },
          temperature {
            min,
            max,
            feelsLike,
            actual,
          },
          timestamp
        },
      }
    }
  `
    const response = await request(GRAPHQL_API, query, {city});
    return response.getCityByName;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.city = action.payload.name;
      state.country = action.payload.country;
      state.summary = action.payload.weather.summary;
      state.temperature = action.payload.weather.temperature;
      state.timestamp = action.payload.weather.timestamp;
    });
  
    builder.addCase(fetchWeather.rejected, (state) => {
      state.city = 'Iqaluit';
      state.country = 'CA';
      state.summary = {
        title: 'Cold',
        icon: '13d'
      };
      state.temperature = {
        atual: 0,
        feelsLike: 0,
        min: 0,
        max: 0
      };
      state.timestamp = Date.now();
    })
  },
});

export default weatherSlice.reducer;
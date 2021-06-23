import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchWeather } from './features/weather/weatherSlice';

// components
import Weather from './components/Weather';

/**
 * Obs: As I am not familiar with redux, I would use
 * Context to manage that global state.
 */

const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    /**
     * I decided to use IP address lookup to get the city of the user location instead of using the geolocation api
     * The decision was made due to our graphQL api only cover requests by id and city names.
     * Due to that, if I used the geolocation api I would get the long and lat and then
     * do a reverse geocoding using google maps (which would require an api key) to get the city name.
     * 
     * Another option would be to have graphQL api to accept lng and lat as parameters because 
     * Open Weather API has a endpoint that accept lng and lat to fetch the weather data too.
     */

    const getWeather = async () => {
      let city;
      try {
        const { data } = await axios.get('http://ip-api.com/json');
        city = data.city;
      } catch {
        city = 'Sao Paulo' // Sao Paulo will be the default city
      }

      dispatch(fetchWeather(city));
    }

    getWeather();
    // eslint-disable-next-line
  }, []);

  return (
      <Weather />
  );
}

export default App;

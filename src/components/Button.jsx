import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';

const ButtonStyled = styled.button`
  background-color: ${({color}) => color || '#f542b3'};
  border:none;
  font-size: 20px;
  height: 40px;
  width: 90px;
  border-radius: 10px;
  cursor: pointer;

  :active {
    background-color: #ffc7ea;
  }
`

const Button = ({ color }) => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.weather.city);
  // Needed to get the city from redux to pass as a params to the fetchWeather()

  const handleOnClick = () => {
    dispatch(fetchWeather(city));
  }
  
  return <ButtonStyled color={color} onClick={handleOnClick}>
    Refresh
  </ButtonStyled>
}

export default Button;
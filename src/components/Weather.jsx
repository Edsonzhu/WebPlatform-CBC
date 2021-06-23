import { useSelector } from 'react-redux';
import styled from 'styled-components';

// components
import Button from './Button';

const Container = styled.div`
  margin: 100px auto 0;
  width: fit-content;
  text-align: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  border-top: 1px solid gray;
  padding-top: 20px;
`

const SmallContent = styled.p`
  font-size: 10px;
`

const Weather = () => {
  const weatherObject = useSelector(data => data.weather);
  
  const dayFormat = { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const time = new Date(weatherObject.timestamp * 1000).toLocaleDateString('en-CA', dayFormat)

  return <Container>
    <Header>
      <h2>{`${weatherObject.city} - ${weatherObject.country}`}</h2>
      <img src={`http://openweathermap.org/img/wn/${weatherObject.summary.icon}@2x.png`} alt={weatherObject.summary.title} />
    </Header>
    <Content>
      Temperature: {weatherObject.temperature.actual}&#186;F<br />
      Feels Like: {weatherObject.temperature.feelsLike}&#186;F<br />
      Min: {weatherObject.temperature.min}&#186;F<br />
      Max: {weatherObject.temperature.max}&#186;F<br />
    </Content>
    <SmallContent>
      Last updated: {time}
    </SmallContent>
    <Button />
  </Container>
}

export default Weather;
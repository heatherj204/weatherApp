import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import drizzle_icon from '../assets/drizzle.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    // const allIcons = {
    //     "01d": clear_icon,
    //     "01n": clear_icon,
    //     "02d": cloud_icon,
    //     "02n": cloud_icon,
    //     "03d": cloud_icon,
    //     "03n": cloud_icon,
    //     "04d": drizzle_icon,
    //     "04n": drizzle_icon,
    //     "09d": rain_icon,
    //     "09n": rain_icon,
    //     "10d": rain_icon,
    //     "10n": rain_icon,
    //     "13d": snow_icon,
    //     "13n": snow_icon,
    // }

    const weatherIcon = ({iconCode}) => {
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        return <img src={iconURL} alt='Weather Icon' />;
    }

    const search = async (city) => {
        if(city === "") {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if(!response.ok) {
                alert(data.message);
                return
            }
            // const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
                descpt: data.weather[0].description
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        // Default search for Dublin on initial load
        search("Dublin");
    }, []);

    return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search for a city...' />
            <img src={search_icon} alt='Search' onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            {/* <img src="https://openweathermap.org/img/wn/02d@2x.png" alt='icon' className='weather-icon' /> */}
            <div className='weather-icon'>
                {weatherIcon({iconCode: weatherData.icon})}
            </div>
            <p className='temp'>{weatherData.temp}°C</p>
            <p className='location'>{weatherData.location}</p>
            <p className='descpt'>{weatherData.descpt}</p>
            <div className='weather-details'>
                <div className='col'>
                    <img src={humidity_icon} alt='humidity' />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt='wind' />
                    <div>
                        <p>{weatherData.wind}Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
    </div>
  )
}

export default Weather

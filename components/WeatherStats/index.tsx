import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import styles from './style';


interface WeatherStatsProps {
    weather: any;
    unit: string;
}

export function WeatherStats({weather, unit} : WeatherStatsProps) {

    return (
        <>
            <View style={styles.container}>
                {weather !== undefined ? 
                    <View style={styles.weatherIconImageContainer}>
                        <Image 
                            style={styles.weatherIconImage} 
                            resizeMode={'cover'} 
                            source={{uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}}
                        />
                    </View>    
                :<></>}
    
                <View style={styles.textContainer}>
                    <Text style={styles.weatherConditionText}>
                        {weather !== undefined ? `${weather.weather[0].description}` : ""}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.temperature}>
                        {weather !== undefined ? `${weather.main.temp}º${unit.charAt(0)}` : ""}
                    </Text>
                </View>
            </View>
        </>
    )
}
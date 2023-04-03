import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';


interface WeatherStatsProps {
    weather: any;
    unit: string;
}

export function WeatherStats({weather, unit} : WeatherStatsProps) {

    return (
        <View style={{width:"100%",}}>

            {weather !== undefined ? 
                <View style={{alignSelf:"center", alignItems:"center", width:"100%"}}>
                    <Image 
                        style={{width: 125, height: 125,}} 
                        resizeMode={'cover'} 
                        source={{uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}}
                    />
                </View>    
            :<></>}
 
            <View style={{alignSelf:"center", alignItems:"center", width:"100%"}}>
                <Text style={{ fontWeight:"bold", fontSize:16 }}>{weather !== undefined ? `${weather.weather[0].description}` : ""}</Text>
            </View>
            <View style={{alignSelf:"center", alignItems:"center", width:"100%"}}>
                <Text style={{fontWeight:"bold", fontSize:50}}>{weather !== undefined ? `${weather.main.temp}º${unit.charAt(0)}` : ""}</Text>
            </View>
        </View>

    )
}
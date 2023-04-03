import React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { Button } from 'react-native-paper';
import { WeatherStats } from './WeatherStats';
import { UnitPicker } from './UnitPicker';
import {WEATHER_NOW_KEY} from '@env'



export function Home() {

    //const [location, setLocation] = useState<any>(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const [weather, setWeather] = useState<any>(undefined);
    const [selectedUnit, setSelectedUnit] = useState<string>("Fahrenheit");
    const [isLoading, setIsLoading] = useState(false);

    
    async function fetchWeather(latitude: number, longitude: number, units: string) {
        //latitude = 40;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${latitude}&lon=${longitude}&appid=${WEATHER_NOW_KEY}`);
            setWeather(response.data);
   
        } catch(error) {
            setErrorMsg("Unable to get weather data. \nMake sure that you have internet connection.")
        }
    }
    
    
    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
        
            if (granted === 'granted') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            setErrorMsg("Unable to fetch weather data. Please enable location.");
            return false;
        }
    }
    

    async function getLocation() {
        try {
            const result = await requestLocationPermission();
            if (result) {
                const position: any = await new Promise((resolve, reject) => {
                    Geolocation.getCurrentPosition(
                    position => {
                        resolve(position);                        
                    },
                    error => {
                        if(error.code === 2) {
                        setErrorMsg("Unable to fetch most recent weather data.\nPlease enable location.");
                        }
                        reject(error)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                });
                //setLocation(position);
                setErrorMsg("");
                return position.coords;
                
            }
        } catch (error) {
            return undefined;
        }
    }
    

    async function handleWeatherCheck(unit: string) {
        setIsLoading(true);
        let currentLocation : any = await getLocation();

        let unitName;    
        if(unit === "Kelvin") {
            unitName = "standard";
        } else if(unit === "Celsius") {
            unitName = "metric";
        } else {
            unitName = "imperial";
        }
    
        if(currentLocation !== undefined && currentLocation !== null) {
            await fetchWeather(currentLocation.latitude, currentLocation.longitude, unitName);
        }
        setIsLoading(false);
    }
    
    async function handleUnitChange(unit: string) {
        await handleWeatherCheck(unit);
        setSelectedUnit(unit);
    }


    useEffect(() => {

        (async function() {
            await handleWeatherCheck(selectedUnit);
        })();
        
    }, []);


    return (
        <View style={{paddingTop:"5%"}}>
            <View style={{flexDirection: 'column', alignItems:"center",}}>
                <Text style={{fontWeight:"bold", fontSize:16}}>{weather !== undefined ? `${weather.name}, ${weather.sys.country}` : ""} </Text>
            </View>

            <Button
                style={{alignSelf:"flex-end", paddingRight:"5%", paddingTop:15}}
                onPress={() => handleWeatherCheck(selectedUnit)}
                accessibilityLabel="Refresh weather data"
            >REFRESH</Button>

            <View style={{flexDirection: 'column', alignItems:"center",}}>
                <View style={{width:"100%", height:225}}>
                    { (isLoading === true) ? 
                        <View style={{alignSelf:"center", alignItems:"center", width:"100%",}}>
                            <ActivityIndicator size="large" animating={true} style={{width: 125, height: 125,}}/> 
                        </View>                : 
                        <>
                            <WeatherStats weather={weather} unit={selectedUnit}/>
                        </>
                    }
                </View>
                
                <View style={{alignSelf:"center"}}>
                    <Text style={{fontWeight:"bold"}}>{errorMsg}</Text>
                </View>

                <UnitPicker selectedUnit={selectedUnit} handleChange={handleUnitChange}/>
            </View> 
        </View>
    )
}
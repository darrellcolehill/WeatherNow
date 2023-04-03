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
import { WeatherStats } from '../WeatherStats';
import { UnitPicker } from '../UnitPicker';
import { OPEN_WEATHER_KEY, OPEN_WEATHER_BASE_URL } from '@env'
import styles from './style';


export function Home() {

    const [errorMsg, setErrorMsg] = useState("");
    const [weather, setWeather] = useState<any>(undefined);
    const [selectedUnit, setSelectedUnit] = useState<string>("Fahrenheit");
    const [isLoading, setIsLoading] = useState(false);

    
    async function fetchWeather(latitude: number, longitude: number, units: string) {
        try {
            const response = await axios.get(`${OPEN_WEATHER_BASE_URL}?units=${units}&lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}`);
            setWeather(response.data);
            setErrorMsg("");
   
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
                        (position) => {
                            resolve(position);                        
                        },
                        (error) => {
                            if(error.code === 2) {
                            setErrorMsg("Unable to fetch most recent weather data.\nPlease enable location.");
                            }
                            reject(error)
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                });
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
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                    {weather !== undefined ? `${weather.name}, ${weather.sys.country}` : ""} 
                </Text>
            </View>

            <Button
                style={styles.refreshButton}
                onPress={() => handleWeatherCheck(selectedUnit)}
                accessibilityLabel="Refresh weather data"
            >REFRESH</Button>

            <View>
                <View style={styles.loadingIconContainer}>
                    { (isLoading === true) ? 
                        <ActivityIndicator size="large" animating={true} style={styles.loadingIcon}/> 
                    : 
                        <WeatherStats weather={weather} unit={selectedUnit}/>
                    }
                </View>
                
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>{errorMsg}</Text>
                </View>

                <UnitPicker selectedUnit={selectedUnit} handleChange={handleUnitChange}/>
            </View> 
        </View>
    )
}
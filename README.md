# WeatherNow
## About

A simple React Native app that fetches and displays the current weather data for the user's location.

(target's Android devices)

## MVP

1. Display the user's current location (city and country)

2. Show the current temperature, weather condition, and an appropriate icon

3. Provide a refresh button to update the weather data

4. Make the app visually appealing with a clean and modern design

## Bonus Feature

1. Can change the unit of measure for temperature

## Running the application

1. Open your desired emulator in android studio

2. Create a .env file and place it in the WeatherNow folder and add the following lines:

       OPEN_WEATHER_KEY='<YOUR_OPEN_WEATHER_API_KEY>'
  
       OPEN_WEATHER_BASE_URL='https://api.openweathermap.org/data/2.5/weather'
  
3. Open a terminal in the WeatherNow folder and run the following commands:

       npm install
  
       npx react-native start

4. Open a second terminal and run the command: `npx react-native run-android `

## Difficulties

1. At first, I encountered some odd issues with running the app. After some debugging, I realized that it was an issue with having multiple versions of JDK. I resolved the issue by directly setting JDK version within Android studio. 

2. The next issue was testing. Currently, the app only supports Android. This is because I neither have a Mac, or the hardware to run a VM with a MacOS image to execute/modify the XCode for IOS. Due to this, I was unable to test the app on IOS and decided to only support Android.

## Steps for Further Development

1. Utilize the empty space towards the bottom of the screen by adding information regarding the three/five day forecast

2. Make the home screen more customizable by allowing the user to display more weather statistics such as wind speed, max daily temperature, and minimum daily temperature 

3. Make the background gradient dependent on the main weather condition

4. Add animations that correspond to the weather description

## References

* https://openweathermap.org/api

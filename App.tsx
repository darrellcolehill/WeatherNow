/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Home } from './components/Home';
import {} from '@env';


function App(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <LinearGradient style={styles.linearGradient} colors={gradients.Default}>
      <SafeAreaView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          >
            <Home/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor:"green",
    alignItems:"center",
    //alignItems:"flex-end",
  },
  linearGradient: {
    height: "100%",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const gradients = {
  "Clear": ['#ace0f9', '#e8f8ff'],
  'Thunderstorm': ['#a075ba', '#569693'],
  'Drizzle': ['#a8edea', '#fed6e3'],
  'Rain': ['#a8edea', '#fed6e3'],
  'Snow': ['#FFFEFF', '#D7FFFE'],
  'Mist': ['#c1dfc4', '#deecdd'],
  'Smoke': ['#c1dfc4', '#deecdd'],
  'Haze': ['#e8bcdc', '#fef9d7'],
  'Dust': ['#c1dfc4', '#deecdd'],
  'Fog': ['#c1dfc4', '#deecdd'],
  'Sand': ['#fcebb3', '#f5d362'],
  'Ash': ['#ede4c2', '#e8e5da'], 
  'Squall': ['#c1dfc4', '#deecdd'],
  'Tornado': ['#989cfa', '#a762d1'],
  'Default': ['#ace0f9', '#e8f8ff']
}

export default App;

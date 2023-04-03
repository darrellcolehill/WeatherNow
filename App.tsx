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


function App(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <LinearGradient style={styles.linearGradient} colors={['#ace0f9', '#e8f8ff']}>
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
  linearGradient: {
    height: "100%",
    width: "100%",
  },
});


export default App;

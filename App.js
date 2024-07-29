import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import OptionsScreen from './components/OptionsScreen';
import Cargue from './components/Cargue';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Options" component={OptionsScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Cargue" component={Cargue} />
        </Stack.Navigator>
      ) : (
        <View style={styles.container}>
          <ImageBackground source={require('./images/banner.png')} style={styles.background} resizeMode="cover">
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          </ImageBackground>
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default App;

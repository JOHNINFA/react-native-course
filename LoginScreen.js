import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = {
    'Id1': '123',
    'Id2': '345',
    'Id3': '456',
    'Id4': '678',
    'Id5': '890',
    'Id6': '1029',
  };

  const handleLogin = () => {
    if (users[username] && users[username] === password) {
      onLogin(true, username); // Pass the username to identify the user
    } else {
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos.');
    }
  };
  return (
    <ImageBackground source={require('./images/banner.png')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 130,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default LoginScreen;

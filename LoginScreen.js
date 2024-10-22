import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState({}); // Estado para almacenar usuarios

  // URL de la API de Google Apps Script
  const API_URL = 'https://script.google.com/macros/s/AKfycbyCSQ-LxLA1VyltPegjtpnWV5xuMsgxLofPDniQj_ZgDmN8Jchh7JsFKdIlBAcqyuKBhA/exec'; // Cambia esto por la URL de tu API

  // Cargar usuarios desde Google Sheets
  const loadUsers = async () => {
    try {
      const response = await fetch(`${API_URL}?action=getUsers`);
      const data = await response.json();
      setUsers(data); // Actualiza el estado con los usuarios obtenidos
    } catch (error) {
      console.error('Error al acceder a Google Sheets:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios.');
    }
  };

  useEffect(() => {
    loadUsers(); // Llama a la función al montar el componente
  }, []);

  const handleLogin = () => {
    // Verifica las credenciales ingresadas
    if (users[username] && users[username] === password) {
      onLogin(true, username); // Pasa el nombre de usuario para identificar al usuario
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
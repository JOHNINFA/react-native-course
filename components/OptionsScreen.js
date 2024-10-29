import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import CloudDownloadIcon from '../assets/cloud-download-outline.svg';
import CloudUploadIcon from '../assets/cloud-upload-outline.svg';
import Rendimiento from '../assets/newspaper-outline.svg';



const OptionsScreen = ({ navigation, userId }) => {
  const [carguePressed, setCarguePressed] = useState(false); // Estado para verificar si "Cargue" ha sido presionado
  const [isPressed, setIsPressed] = useState(false); // Estado para verificar si el botón "Salir" ha sido presionado

  const handleCarguePress = () => {
    setCarguePressed(true); // Marca que se ha presionado "Cargue"
    navigation.navigate('Cargue', { userId }); // Navega a la pantalla "Cargue"
  };

  const handleOptionPress = (screen) => {
    if (carguePressed) {
      navigation.navigate(screen, { userId }); // Navega a la pantalla deseada si "Cargue" ha sido presionado
    } else {
      alert('Por favor, presiona el botón "Cargue" antes de continuar.'); // Muestra una alerta si "Cargue" no ha sido presionado
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirmar Salida",
      "¿Estás seguro de que deseas salir de la aplicación?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Salida cancelada"),
          style: "cancel"
        },
        { 
          text: "Salir", 
          onPress: () => BackHandler.exitApp() // Cierra la aplicación si se confirma
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón "Salir" en la parte superior izquierda */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          isPressed ? styles.logoutButtonPressed : styles.logoutButtonDefault,
        ]}
        onPressIn={() => setIsPressed(true)} // Cambia el estado al presionar
        onPressOut={() => setIsPressed(false)} // Cambia el estado al soltar
        onPress={handleLogout} // Maneja la acción de salir
      >
        <Text
          style={[
            styles.logoutText,
            isPressed ? styles.logoutTextPressed : styles.logoutTextDefault,
          ]}
        >
          Salir
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleCarguePress}>
        <View style={[styles.iconWithText, { paddingRight: 14.5 }]}>
          <CloudDownloadIcon width={24} height={24}  color="white" fill="white"   style={styles.icon} />
          <Text style={styles.optionText}>Cargue</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Main')}>
        <View style={styles.iconWithText}>
          {/* Ícono de subida para el botón Sugerido */}
          < CloudUploadIcon width={24} height={24}  color="white"  fill="white" style={styles.icon} />
          <Text style={styles.optionText}>Sugerido</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Vencidas')}>
        <View style={styles.iconWithText}>
          {/* Ícono de periódico para el botón Rendimiento */}
          < Rendimiento width={24} height={24}  color="white" fill="white" style={styles.icon} />
          <Text style={styles.optionText}>Rendimiento</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Color de fondo del contenedor
  },
  logoutButton: {
    position: 'absolute', // Posicionamiento absoluto
    top: 40, // Distancia desde la parte superior
    left: 20, // Distancia desde la izquierda
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5', // Color de fondo inicial (mismo que el contenedor)
  },
  logoutButtonDefault: {
    backgroundColor: '#f5f5f5', // Color de fondo por defecto
  },
  logoutButtonPressed: {
    backgroundColor: '#00ad53', // Color de fondo al presionar
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutTextDefault: {
    color: '#00ad53', // Color de texto inicial
  },
  logoutTextPressed: {
    color: 'white', // Color de texto al presionar
  },
  option: {
    backgroundColor: '#00ad53',
    padding: 20,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconWithText: {
    flexDirection: 'row', // Alinea el ícono y el texto en fila
    alignItems: 'center', // Alinea el ícono y el texto verticalmente
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
});

export default OptionsScreen;

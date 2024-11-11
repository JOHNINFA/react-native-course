import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, StatusBar, ImageBackground } from 'react-native';
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


  return (
    <ImageBackground 
      source={require('../assets/banner2.png')} // Cambia la ruta a tu imagen
      style={styles.container} // Utiliza el mismo estilo que tenías en tu contenedor
      resizeMode="cover" // Puedes ajustar esto a 'contain' si prefieres
    >
      <StatusBar hidden={true} /> 
    

     

      <TouchableOpacity style={styles.option} onPress={handleCarguePress}>
        <View style={[styles.iconWithText, { paddingRight: 14.5 }]}>
          <CloudDownloadIcon width={24} height={24} color="white" fill="white" style={styles.icon} />
          <Text style={styles.optionText}>Cargue</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Main')}>
        <View style={styles.iconWithText}>
          <CloudUploadIcon width={24} height={24} color="white" fill="white" style={styles.icon} />
          <Text style={styles.optionText}>Sugerido</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Vencidas')}>
        <View style={styles.iconWithText}>
          <Rendimiento width={24} height={24} color="white" fill="white" style={styles.icon} />
          <Text style={styles.optionText}>Rendimiento</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importamos Ionicons para los íconos

const OptionsScreen = ({ navigation, userId }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Main', { userId })}>
        <View style={styles.iconWithText}>
          {/* Ícono de subida para el botón Sugerido */}
          <Ionicons name="cloud-upload-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.optionText}>Sugerido</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Cargue', { userId })}>
        <View style={[styles.iconWithText, { paddingRight: 14.5 }]}>
          {/* Ícono de descarga para el botón Cargue */}
          <Ionicons name="cloud-download-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.optionText}>Cargue</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Vencidas', { userId })}>
        <View style={styles.iconWithText}>
          {/* Ícono de periódico para el botón Rendimiento */}
          <Ionicons name="newspaper-outline" size={24} color="white" style={styles.icon} />
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
    flexDirection: 'row',   // Alinea el ícono y el texto en fila
    alignItems: 'center',   // Alinea el ícono y el texto verticalmente
  },
  icon: {
    marginRight: 10,        // Espacio entre el ícono y el texto
  },
});

export default OptionsScreen;

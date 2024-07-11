import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Platform } from "react-native";

const Navbar = () => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Lunes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Martes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Miércoles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Jueves</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Viernes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Sábado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dayButton}>
          <Text style={styles.dayText}>Domingo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(245, 245, 245, 0.6)', // Gris claro casi transparente
    marginTop: 25,
    padding: 15,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayButton: {
    backgroundColor: 'white', // Fondo blanco para los botones
    borderRadius: 8, // Borde redondeado
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 10, // Espacio entre los botones
  },
  dayText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Navbar;

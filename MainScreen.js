import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

const MainScreen = ({ route }) => {
  const { userId } = route.params; // Obtener el userId de los parámetros de navegación
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <View style={styles.container}>
      <Navbar selectedDay={selectedDay} onDaySelected={setSelectedDay} />
      <ProductList selectedDay={selectedDay} userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default MainScreen;

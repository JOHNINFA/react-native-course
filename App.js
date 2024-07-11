// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProductList from './components/ProductList'; // Ruta correcta a ProductList.js
import Navbar from './components/Navbar';

const App = () => {
  return (
    <View style={styles.container}>
      <Navbar/>
     
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

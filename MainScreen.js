import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;

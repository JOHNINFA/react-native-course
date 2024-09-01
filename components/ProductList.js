import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Product from './Product'; // Ruta correcta a Product.js
import productos from './Productos'; // Ajusta la ruta a productos.js y asegúrate del nombre


const orderOfProducts = [
  "AREPA TIPO OBLEA",
  "AREPA MEDIANA",
  "AREPA TIPO PINCHO",
  "AREPA CON QUESO - CORRIENTE",
  "AREPA CON QUESO- ESPECIAL GRANDE",
  "AREPA CON QUESO- ESPECIAL PEQUEÑA",
  "AREPA CON QUESO MINI X 10",
  "AREPA CON QUESO CUADRADA",
  "AREPA DE CHOCLO-CORRIENTE",
  "AREPA DE CHOCLO CON QUESO GRANDE",
  "AREPA DE CHOCLO CON QUESO PEQUEÑA",
  "AREPA BOYACENSE X5",
  "AREPA BOYACENSE X10",
  "AREPA SANTADERANA",
  "ALMOJABANAS X5",
  "ALMOJABANAS X10",
  "AREPA CON SEMILLA DE QUINUA",
  "AREPA CON SEMILLA DE CHIA",
  "AREPA CON SEMILLA DE AJONJOLI",
  "AREPA CON SEMILLA DE LINANZA",
  "AREPA CON SEMILLA DE GIRASOL",
  "AREPA CHORICERA",
  "AREPA LONCHERIA",
  "AREPA CON MARGARINA Y SAL",
  "YUCAREPA",
  "AREPA TIPO ASADERO X 10",
  "AREPA PARA RELLENAR # 1",
  "AREPA PARA RELLENAR #2",
  "AREPA PARA RELLENAR #3",
  "PORCION DE AREPAS X 2 UND",
  "PORCION DE AREPAS X 3 UND",
  "PORCION DE AREPAS X 4 UND",
  "PORCION DE AREPAS X 5 UND",
  "AREPA SUPER OBLEA",
  "LIBRAS DE MASA",
  "MUTE BOYACENSE",
  "LIBRA DE MAIZ PETO",
  "ENVUELTO DE MAIZ X 5 UND"
];

const ProductList = ({ selectedDay }) => {
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: quantity,
    }));
  };

  const handleSendPress = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const formData = new FormData();

      orderOfProducts.forEach(productName => {
        const quantity = quantities[productName] || '0';
        formData.append(productName, quantity);
      });

      const response = await fetch('https://script.google.com/macros/s/AKfycbx_deSF4M2f20mkMSAVdczW_BKD1peqyHixHh2una9VhlyygJl1SwcGz7UxioKOXzApRQ/exec', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar las cantidades');
      }

      Alert.alert('Éxito', '¡Cantidades enviadas exitosamente!');
      // Limpiar cantidades después del envío exitoso
      setQuantities({});
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un error al enviar las cantidades');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!selectedDay && (
        <Text style={styles.alertText}>Por favor, seleccione un día para ingresar cantidades.</Text>
      )}
      {orderOfProducts.map((productName, index) => (
        <Product
          key={index}
          product={productos[index]} // Ajusta según tu estructura de productos y asegúrate de pasar el objeto completo
          quantity={quantities[productName] || '0'}
          onQuantityChange={handleQuantityChange}
          editable={!!selectedDay} // Deshabilitar el campo si no se ha seleccionado un día
        />
      ))}
      <TouchableOpacity onPress={handleSendPress} style={styles.sendButton} disabled={loading || !selectedDay}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.sendButtonText}>Enviar Todas las Cantidades</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  alertText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  sendButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#003d88',
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductList;
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Product from './Product'; // Asegúrate de que este componente esté bien configurado
import productos from './Productos'; // Verifica que esta sea la estructura correcta de los productos

// Lista de productos en el orden deseado
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

const ProductList = ({ selectedDay, userId }) => {
  const [quantities, setQuantities] = useState({}); // Guarda las cantidades
  const [loading, setLoading] = useState(false); // Muestra el estado de carga

  // Maneja el cambio de cantidad para cada producto
  const handleQuantityChange = (productName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: quantity,
    }));
  };

  // Función para enviar los datos a Google Sheets
  const handleSendPress = async () => {
    if (loading) return; // Evita múltiples envíos si está en proceso

    setLoading(true);
    try {
      const formData = new FormData();
      
      formData.append('userId', userId); // Incluye el userId en el FormData

      // Agrega cada producto y su cantidad al formData
      orderOfProducts.forEach(productName => {
        const quantity = quantities[productName] || '0';
        formData.append(productName, quantity);
      });

      // Petición POST a Google Apps Script
      const response = await fetch(`https://script.google.com/macros/s/AKfycbyHwYBeNjh5HjfKkZgMdQkAYi6bq1Ho2LQmbhTUQ9DqxGpbcuCx1d0FS_D8C6Dd_yMusw/exec?userId=${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar las cantidades');
      }

      Alert.alert('Éxito', '¡Cantidades enviadas exitosamente!');
      setQuantities({}); // Limpia las cantidades después de enviar
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
          product={productos[index]} // Asegúrate de que este objeto esté en el orden correcto
          quantity={quantities[productName] || '0'} // Usa la cantidad o '0' si no se ha ingresado
          onQuantityChange={handleQuantityChange} // Maneja cambios de cantidad
          editable={!!selectedDay} // Si no se selecciona día, deshabilita el campo
        />
      ))}
      <TouchableOpacity
        onPress={handleSendPress}
        style={styles.sendButton}
        disabled={loading || !selectedDay}
      >
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

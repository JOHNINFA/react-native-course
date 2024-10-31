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

// Mapeo de URLs por día
const getUrlByDay = (selectedDay, userId) => {
  const urls = {
    Lunes: `https://script.google.com/macros/s/AKfycbyVnHHWGlPiPM6iDUeVfT6-puzI9TEHWfD0zsUgtUT9R3zJgC91M6UAaR791StUm4Ke/exec?userId=${userId}`,
    Martes: `https://example.com/martes?userId=${userId}`,
    Miércoles: `https://example.com/miercoles?userId=${userId}`,
    Jueves: `https://example.com/jueves?userId=${userId}`,
    Viernes: `https://example.com/viernes?userId=${userId}`,
    Sábado: `https://example.com/sabado?userId=${userId}`,
    Domingo: `https://example.com/domingo?userId=${userId}`,
  };

  return urls[selectedDay] || null; // Retorna la URL correspondiente al día o null si no coincide
};

const ProductList = ({ selectedDay, userId }) => {
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
      const url = getUrlByDay(selectedDay, userId);
      
      if (!url) {
        Alert.alert('Error', 'Día no seleccionado o no válido.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('userId', userId);

      orderOfProducts.forEach(productName => {
        const quantity = quantities[productName] || '0';
        formData.append(productName, quantity);
      });

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text(); // Obtener el texto de la respuesta

      if (!response.ok) {
        throw new Error('Error al enviar las cantidades');
      }

      if (responseText.includes("Error: No se pueden enviar datos hasta que las celdas estén vacías")) {
        Alert.alert('Error', 'No se pueden enviar datos hasta que las celdas estén vacías en la hoja de cálculo.');
      } else {
        Alert.alert('Éxito', '¡Cantidades enviadas exitosamente!');
        setQuantities({});
      }
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
          product={productos[index]}
          quantity={quantities[productName] || '0'}
          onQuantityChange={handleQuantityChange}
          editable={!!selectedDay}
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


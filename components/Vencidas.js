import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

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

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const Vencidas = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [quantities, setQuantities] = useState({});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
          {dias.map(dia => (
            <TouchableOpacity 
              key={dia} 
              style={[styles.dayButton, selectedDay === dia && styles.selectedDayButton]} 
              onPress={() => setSelectedDay(dia)}
            >
              <Text style={[styles.dayText, selectedDay === dia && styles.selectedDayText]}>{dia}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {!selectedDay && (
        <Text style={styles.alertText}>Por favor, seleccione un día para ingresar cantidades.</Text>
      )}

      {selectedDay && (
        <View style={styles.productsContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.productHeader]}>PRODUCTOS</Text>
            <Text style={[styles.headerText, styles.quantityHeader]}>CANTIDAD</Text>
          </View>
          {orderOfProducts.map((productName, index) => (
            <View key={index} style={styles.productContainer}>
              <TouchableOpacity style={styles.productButton}>
                <Text style={styles.productName}>{productName}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quantityButton}>
                <Text style={styles.quantityText}>
                  {quantities[productName] || '0'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5', // Gris suave
  },
  navbar: {
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedDayButton: {
    backgroundColor: '#F0F0F0',
    elevation: 3,
    shadowOpacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: 'black',
  },
  alertText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  productsContainer: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 5,
    borderRadius: 8,
    textAlign: 'center',
    color:'#696969'
    
  },
  productHeader: {
    width: '70%', // Ajustar el ancho de la columna de productos
  },
  quantityHeader: {
    
    width: '20%', // Ajustar el ancho de la columna de cantidad
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between', // Asegura que los botones estén separados
  },
  productButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '70%',
    minHeight: 40, // Asegura una altura mínima
    justifyContent: 'center',
    alignItems: 'center', // Centra el contenido
  },
  productName: {
    fontSize: 11,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  quantityButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '20%',
    minHeight: 40, // Asegura una altura mínima
    justifyContent: 'center',
    alignItems: 'center', // Centra el contenido
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    color: '#808080',
  },
});

export default Vencidas;

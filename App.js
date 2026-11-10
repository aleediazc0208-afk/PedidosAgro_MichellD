import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contador, setContador] = useState(0);

  const registrarPedido = () => {
    const nombreLimpio = cliente.trim();
    const productoLimpio = producto.trim();
    const cant = Number(cantidad);
    const prec = Number(precio);

    if (nombreLimpio === '') {
      setEsError(true);
      setMensaje('Debe ingresar el nombre del cliente');
      return;
    }
    if (productoLimpio === '') {
      setEsError(true);
      setMensaje('Debe ingresar un producto');
      return;
    }
    if (cantidad.trim() === '' || isNaN(cant) || !Number.isInteger(cant) || cant <= 0) {
      setEsError(true);
      setMensaje('Ingrese una cantidad válida');
      return;
    }
    if (precio.trim() === '' || isNaN(prec) || prec < 0) {
      setEsError(true);
      setMensaje('Ingrese un precio unitario válido');
      return;
    }

    const total = cant * prec;
    setEsError(false);
    setMensaje(
      `Estado: Pedido registrado correctamente\nCliente: ${nombreLimpio}\nProducto: ${productoLimpio}\nCantidad: ${cant}\nTotal: $${total.toLocaleString('es-CO')}`
    );
    setContador(contador + 1);
  };

  const limpiar = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setMensaje('');
    setEsError(false);
  };



  //PARTE VISIBLE DE LA APP
  return (
    <View style={styles.contenedor}>
      
      <View style={styles.contenido}>
        <Text style={styles.titulo}>🍎AgroPedidos Mosquera🍎</Text>
        <Text style={styles.bienvenida}>🍏¡Bienvenido a AgroPedidos! Registre sus pedidos aquí.🍏</Text>

        
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>🍏Nombre del cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={cliente}
            onChangeText={setCliente}
          />

          <Text style={styles.etiqueta}>🍏Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Tomates"
            value={producto}
            onChangeText={setProducto}
          />

          <Text style={styles.etiqueta}>🍏Cantidad (En unidades)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 5"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Text style={styles.etiqueta}>🍏Precio unitario ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 3000"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          <Text style={styles.contador}>🍎Pedidos registrados: {contador}</Text>

          <Button title="Registrar pedido" color="#2e7d32" onPress={registrarPedido} />

          <View style={{ marginTop: 10 }}>
            <Button title="Limpiar Historial" color="#757575" onPress={limpiar} />
          </View>

          {mensaje !== '' && (
            <Text style={[styles.mensaje, esError ? styles.error : styles.exito]}>
              {mensaje}
            </Text>
          )}
        </View>
      </View>

      
      <View style={styles.footer}>
        <Text style={styles.footerTexto}>© 2026 AgroPedidos Mosquera</Text>
        <Text style={styles.footerSub}>Prototipo de registro de pedidos</Text>
      </View>
    </View>
  );
}


// PARTE DE ESTILOS
const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#edfcdb', },
  contenido: { flex: 1, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1cc425', textAlign: 'center' },
  bienvenida: { fontSize: 15, color: '#2a5024', textAlign: 'center', marginBottom: 20 },

  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  etiqueta: { fontSize: 14, fontWeight: '600', color: '#476d38', marginTop: 10 },
  input: {
    backgroundColor: '#cbdbc4',
    borderWidth: 1,
    borderColor: '#aed581',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  contador: { marginTop: 20, marginBottom: 10, fontSize: 16, fontWeight: 'bold', color: '#33691e' },
  mensaje: { marginTop: 16, padding: 12, borderRadius: 8, fontSize: 15 },
  error: { backgroundColor: '#ffebee', color: '#c62828' },
  exito: { backgroundColor: '#e8f5e9', color: '#1b5e20' },

  footer: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerTexto: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  footerSub: { color: '#c8e6c9', fontSize: 12, marginTop: 2 },
});

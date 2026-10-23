// screens/ProductDetailsScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { AppContext } from '../AppContext';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { addToCart, favorites, toggleFavorite } = useContext(AppContext);
  const isFav = favorites.some((fav) => fav.id === product.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.floatingImageBox}>
          <Text style={styles.bigImage}>{product.image}</Text>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.unit}>{product.unit}</Text>
          </View>
          <Text style={styles.price}>₹{product.price}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Zero-G Product Info</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(product)}>
            <Text style={styles.favText}>{isFav ? '💚 Saved' : '🤍 Favorite'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cartBtn} 
            onPress={() => {
              addToCart(product);
              Alert.alert('Floating Cart', `${product.name} elevated to Cart! 🚀`);
            }}
          >
            <Text style={styles.cartText}>+ Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D17', padding: 20, justifyContent: 'center' },
  card: {
    backgroundColor: '#161B2E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.3)',
    shadowColor: '#00FFA3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
  },
  floatingImageBox: {
    height: 160,
    backgroundColor: '#0B0D17',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#242C44',
  },
  bigImage: { fontSize: 75 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  unit: { fontSize: 13, color: '#8E9BAE', marginTop: 2 },
  price: { fontSize: 24, fontWeight: '900', color: '#00FFA3' },
  divider: { height: 1, backgroundColor: '#242C44', marginVertical: 18 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#00FFA3', marginBottom: 8 },
  desc: { fontSize: 14, color: '#8E9BAE', lineHeight: 22, marginBottom: 24 },
  btnRow: { flexDirection: 'row', gap: 12 },
  favBtn: { flex: 1, borderWidth: 1.5, borderColor: '#00FFA3', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  favText: { color: '#00FFA3', fontWeight: 'bold' },
  cartBtn: { flex: 1, backgroundColor: '#00FFA3', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cartText: { color: '#0B0D17', fontWeight: '900' },
});
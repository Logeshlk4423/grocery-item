// screens/FavoritesScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { AppContext } from '../AppContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, addToCart } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.image}>{item.image}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} / {item.unit}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.cartIconBtn} 
          onPress={() => {
            addToCart(item);
            Alert.alert('Cart Updated', `${item.name} added to Cart!`);
          }}
        >
          <Text style={styles.cartBtnText}>+ Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(item)}>
          <Text style={styles.favIcon}>💚</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySub}>Tap the heart icon on any product to save it here!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D17' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#161B2E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.25)',
  },
  image: { fontSize: 32, marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  price: { fontSize: 14, color: '#00FFA3', fontWeight: '600', marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cartIconBtn: { backgroundColor: '#00FFA3', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  cartBtnText: { color: '#0B0D17', fontWeight: '900', fontSize: 12 },
  favBtn: { padding: 6 },
  favIcon: { fontSize: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  emptySub: { fontSize: 14, color: '#8E9BAE', textAlign: 'center', marginTop: 6 },
});
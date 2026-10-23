// screens/CartScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { AppContext } from '../AppContext';

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(AppContext);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    Alert.alert('Order Success', 'உங்களின் Zero-G Grocery ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது! 🎉');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.image}>{item.image}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</Text>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, -1)}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyNumber}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, 1)}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySub}>Add some floating groceries to get started!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Grand Total:</Text>
              <Text style={styles.totalAmount}>₹{cartTotal}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.25)',
  },
  image: { fontSize: 32, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' },
  price: { fontSize: 13, color: '#00FFA3', marginTop: 2, fontWeight: '600' },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B0D17',
    borderRadius: 8,
    paddingHorizontal: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#242C44',
  },
  qtyBtn: { paddingHorizontal: 10, paddingVertical: 4 },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: '#00FFA3' },
  qtyNumber: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', paddingHorizontal: 4 },
  deleteBtn: { padding: 4 },
  deleteText: { fontSize: 16 },
  footer: {
    backgroundColor: '#161B2E',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 163, 0.3)',
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#8E9BAE' },
  totalAmount: { fontSize: 22, fontWeight: '900', color: '#00FFA3' },
  checkoutBtn: {
    backgroundColor: '#00FFA3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutText: { color: '#0B0D17', fontSize: 16, fontWeight: '900' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  emptySub: { fontSize: 14, color: '#8E9BAE', textAlign: 'center', marginTop: 6 },
});
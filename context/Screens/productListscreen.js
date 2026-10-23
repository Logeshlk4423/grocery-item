// screens/ProductListScreen.js
import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput 
} from 'react-native';
import { AppContext, INITIAL_PRODUCTS } from '../AppContext';

const CATEGORIES = ['All', 'Fruits', 'Dairy', 'Vegetables', 'Pantry'];

export default function ProductListScreen({ navigation }) {
  const { addToCart, favorites, toggleFavorite, userProfile } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = INITIAL_PRODUCTS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }) => {
    const isFav = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        activeOpacity={0.9}
      >
        {/* Discount Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.discount}</Text>
        </View>

        {/* Favorite Icon */}
        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFavorite(item)}>
          <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <Text style={styles.image}>{item.image}</Text>

        <View style={styles.timeTag}>
          <Text style={styles.timeText}>⏱️ {item.deliveryTime}</Text>
        </View>

        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.unit}>{item.unit}</Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          </View>

          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Location Header */}
      <View style={styles.locationHeader}>
        <View>
          <Text style={styles.deliverLabel}>DELIVERY IN 10 MINUTES</Text>
          <Text style={styles.locationText} numberOfLines={1}>📍 {userProfile.address}</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileInitial}>{userProfile.name.charAt(0)}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search 'Milk', 'Apples', 'Honey'..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Pills */}
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catTab, selectedCategory === cat && styles.activeCatTab]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.catText, selectedCategory === cat && styles.activeCatText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Promo Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>⚡ Super Saver Week</Text>
        <Text style={styles.bannerSub}>Get extra 20% off on fresh dairy & organic fruits!</Text>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  deliverLabel: { fontSize: 11, fontWeight: '800', color: '#16A34A', letterSpacing: 0.5 },
  locationText: { fontSize: 13, color: '#4B5563', fontWeight: '500', marginTop: 2, maxWidth: 280 },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: { fontSize: 16, fontWeight: 'bold', color: '#16A34A' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: '#1F2937' },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  catTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCatTab: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  catText: { fontSize: 13, color: '#4B5563', fontWeight: '600' },
  activeCatText: { fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' },
  banner: {
    backgroundColor: '#DCFCE7',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  bannerTitle: { fontSize: 15, fontWeight: 'bold', color: '#14532D' },
  bannerSub: { fontSize: 12, color: '#166534', marginTop: 2 },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#FFFFFF' },
  favBtn: { position: 'absolute', top: 10, right: 10, zIndex: 2 },
  favIcon: { fontSize: 18 },
  image: { fontSize: 50, textAlign: 'center', marginVertical: 14 },
  timeTag: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  timeText: { fontSize: 10, fontWeight: '700', color: '#4B5563' },
  name: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
  unit: { fontSize: 12, color: '#6B7280', marginTop: 2, marginBottom: 8 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: { fontSize: 15, fontWeight: '900', color: '#111827' },
  originalPrice: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
  addBtn: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#16A34A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: { fontSize: 12, fontWeight: '900', color: '#16A34A' },
});
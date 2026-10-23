// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';

export default function ProfileScreen({ navigation }) {
  const { userProfile, userRole } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userProfile.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.roleBadge}>{userRole.toUpperCase()}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardHeader}>Explorer Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Access Email</Text>
            <Text style={styles.value}>{userProfile.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Comms Phone</Text>
            <Text style={styles.value}>{userProfile.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Docking Address</Text>
            <Text style={styles.value}>{userProfile.address}</Text>
          </View>

          <TouchableOpacity 
            style={styles.editBtn} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editBtnText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D17' },
  scroll: { padding: 20 },
  headerCard: {
    backgroundColor: '#161B2E',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.3)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00FFA3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: '900', color: '#0B0D17' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  roleBadge: {
    marginTop: 6,
    backgroundColor: '#0B0D17',
    color: '#00FFA3',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FFA3',
  },
  detailsCard: {
    backgroundColor: '#161B2E',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 163, 0.3)',
  },
  cardHeader: { fontSize: 18, fontWeight: 'bold', color: '#00FFA3', marginBottom: 16 },
  infoRow: { marginBottom: 14 },
  label: { fontSize: 12, color: '#8E9BAE', textTransform: 'uppercase', fontWeight: '600' },
  value: { fontSize: 16, color: '#FFFFFF', fontWeight: '500', marginTop: 2 },
  editBtn: {
    backgroundColor: '#00FFA3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  editBtnText: { color: '#0B0D17', fontWeight: '900', fontSize: 16 },
});